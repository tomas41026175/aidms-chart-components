import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BarChart } from '../BarChart';

const validProps = {
  labels: ['Core 0', 'Core 1', 'Core 2'],
  datasets: [{ label: 'Usage', data: [30, 50, 70] }],
};

describe('BarChart', () => {
  it('正常數據 -> 渲染 SVG', () => {
    const { container } = render(<BarChart {...validProps} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('空 data -> ChartSkeleton', () => {
    const { container } = render(
      <BarChart labels={[]} datasets={[{ label: 'X', data: [] }]} />
    );
    expect(container.querySelector('[role="progressbar"]')).toBeTruthy();
  });

  it('stacked 渲染無報錯', () => {
    const { container } = render(
      <BarChart
        labels={validProps.labels}
        datasets={[
          { label: 'Used', data: [10, 20, 30] },
          { label: 'Free', data: [90, 80, 70] },
        ]}
        stacked
      />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('data 長度不一致 -> ChartError（含 series name）', () => {
    render(
      <BarChart
        labels={['a', 'b', 'c']}
        datasets={[{ label: 'Usage', data: [1, 2] }]}
      />
    );
    expect(screen.getByText(/Usage/)).toBeTruthy();
  });

  it('horizontal layout 正常渲染 SVG', () => {
    const { container } = render(
      <BarChart {...validProps} layout="horizontal" />
    );
    expect(container.querySelector('svg')).toBeTruthy();
  });
});
