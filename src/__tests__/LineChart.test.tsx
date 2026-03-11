import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LineChart } from '../LineChart';

const validProps = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{ label: 'CPU', data: [10, 20, 30] }],
};

describe('LineChart', () => {
  it('正常數據 -> 渲染 SVG（MUI Chart 正常 mount）', () => {
    const { container } = render(<LineChart {...validProps} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('空 datasets（data.length === 0）-> 顯示 ChartSkeleton（等待 SSE 數據）', () => {
    const { container } = render(
      <LineChart labels={[]} datasets={[{ label: 'X', data: [] }]} />
    );
    expect(container.querySelector('[role="progressbar"]')).toBeTruthy();
  });

  it('data 長度不一致 -> 顯示 ChartError，含 series name 提示修正方向', () => {
    render(
      <LineChart
        labels={['Jan', 'Feb', 'Mar']}
        datasets={[{ label: 'CPU', data: [1, 2] }]}
      />
    );
    expect(screen.getByText(/CPU/)).toBeTruthy();
  });

  it('data 含 null -> 正常渲染（null 是合法缺值，不進 ChartError）', () => {
    const { container } = render(
      <LineChart
        labels={['Jan', 'Feb', 'Mar']}
        datasets={[{ label: 'CPU', data: [10, null, 30] }]}
      />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('開發模式驗證失敗 -> console.error 被呼叫（DX：大聲提醒開發者）', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <LineChart
        labels={['a', 'b']}
        datasets={[{ label: 'X', data: [1, 2, 3] }]}
      />
    );
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
