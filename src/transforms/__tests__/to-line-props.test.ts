import { describe, it, expect } from 'vitest';
import { toLineChartProps } from '../to-line-props';

const baseProps = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{ label: 'CPU', data: [10, 20, 30] }],
};

describe('toLineChartProps', () => {
  // --- scaleType 自動偵測 ---

  describe('scaleType 自動偵測', () => {
    it('Date labels -> scaleType: "time"', () => {
      const props = {
        ...baseProps,
        labels: [new Date('2024-01-01'), new Date('2024-01-02'), new Date('2024-01-03')],
      };
      const result = toLineChartProps(props);
      expect(result.xAxis[0].scaleType).toBe('time');
    });

    it('number labels -> scaleType: "linear"', () => {
      const props = { ...baseProps, labels: [1, 2, 3] };
      const result = toLineChartProps(props);
      expect(result.xAxis[0].scaleType).toBe('linear');
    });

    it('string labels -> scaleType: "point"', () => {
      const result = toLineChartProps(baseProps);
      expect(result.xAxis[0].scaleType).toBe('point');
    });
  });

  // --- curve 映射 ---

  describe('curve 映射', () => {
    it('"smooth" -> "monotoneX"（時間序列最自然的平滑曲線）', () => {
      const result = toLineChartProps({ ...baseProps, curve: 'smooth' });
      expect(result.series[0].curve).toBe('monotoneX');
    });

    it('"linear" -> "linear"（直線連接）', () => {
      const result = toLineChartProps({ ...baseProps, curve: 'linear' });
      expect(result.series[0].curve).toBe('linear');
    });

    it('"step" -> "step"（階梯狀，適合離散狀態）', () => {
      const result = toLineChartProps({ ...baseProps, curve: 'step' });
      expect(result.series[0].curve).toBe('step');
    });
  });

  // --- showMark 邏輯 ---

  describe('showMark 邏輯', () => {
    it('<= 30 點 -> showMark: true', () => {
      const props = {
        labels: Array.from({ length: 30 }, (_, i) => `p${i}`),
        datasets: [{ label: 'X', data: Array(30).fill(1) as number[] }],
      };
      const result = toLineChartProps(props);
      expect(result.series[0].showMark).toBe(true);
    });

    it('> 30 點 -> showMark: false（效能保護）', () => {
      const props = {
        labels: Array.from({ length: 31 }, (_, i) => `p${i}`),
        datasets: [{ label: 'X', data: Array(31).fill(1) as number[] }],
      };
      const result = toLineChartProps(props);
      expect(result.series[0].showMark).toBe(false);
    });
  });

  // --- 其他 props ---

  it('animate: false -> skipAnimation: true（SSE 即時更新時關閉動畫）', () => {
    const result = toLineChartProps({ ...baseProps, animate: false });
    expect(result.skipAnimation).toBe(true);
  });

  it('animate: true（預設）-> skipAnimation: false', () => {
    const result = toLineChartProps(baseProps);
    expect(result.skipAnimation).toBe(false);
  });

  it('yRange 正確映射到 yAxis min/max', () => {
    const result = toLineChartProps({ ...baseProps, yRange: [0, 100] });
    expect(result.yAxis[0].min).toBe(0);
    expect(result.yAxis[0].max).toBe(100);
  });

  it('slotProps 合併到軸配置，不覆蓋自動計算的 scaleType', () => {
    const result = toLineChartProps({
      ...baseProps,
      slotProps: { xAxis: { tickLabelStyle: { fontSize: 10 } } },
    });
    expect(result.xAxis[0].tickLabelStyle).toEqual({ fontSize: 10 });
    expect(result.xAxis[0].scaleType).toBe('point');
  });
});
