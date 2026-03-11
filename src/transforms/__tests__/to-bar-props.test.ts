import { describe, it, expect } from 'vitest';
import { toBarChartProps } from '../to-bar-props';

const baseProps = {
  labels: ['Core 0', 'Core 1', 'Core 2'],
  datasets: [{ label: 'Usage', data: [30, 50, 70] }],
};

describe('toBarChartProps', () => {
  it('stacked: true -> 所有 series 共享相同 stack key', () => {
    const result = toBarChartProps({
      ...baseProps,
      datasets: [
        { label: 'Used', data: [10, 20, 30] },
        { label: 'Free', data: [90, 80, 70] },
      ],
      stacked: true,
    });
    const stacks = result.series.map((s: { stack?: string }) => s.stack);
    expect(stacks[0]).toBeDefined();
    expect(stacks[0]).toBe(stacks[1]);
  });

  it('stacked: false（預設）-> series 無 stack key', () => {
    const result = toBarChartProps(baseProps);
    expect(result.series[0].stack).toBeUndefined();
  });

  it('horizontal layout -> labels 軸移到 yAxis（橫向長條圖）', () => {
    const result = toBarChartProps({ ...baseProps, layout: 'horizontal' });
    expect(result.yAxis[0].data).toEqual(baseProps.labels);
    expect(result.xAxis[0].data).toBeUndefined();
  });

  it('vertical layout（預設）-> labels 軸在 xAxis', () => {
    const result = toBarChartProps(baseProps);
    expect(result.xAxis[0].data).toEqual(baseProps.labels);
  });
});
