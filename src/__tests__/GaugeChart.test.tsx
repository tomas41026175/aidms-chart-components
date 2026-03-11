import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GaugeChart } from '../GaugeChart';

describe('GaugeChart', () => {
  it('正常值 -> 渲染 SVG', () => {
    const { container } = render(<GaugeChart value={73} />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('null value -> 顯示 "--"', () => {
    render(<GaugeChart value={null} />);
    expect(screen.getByText('--')).toBeTruthy();
  });

  it('role="meter" 存在', () => {
    const { container } = render(<GaugeChart value={50} />);
    expect(container.querySelector('[role="meter"]')).toBeTruthy();
  });

  it('aria-valuenow 為正確數值', () => {
    const { container } = render(<GaugeChart value={73} min={0} max={100} />);
    const meter = container.querySelector('[role="meter"]');
    expect(meter?.getAttribute('aria-valuenow')).toBe('73');
  });

  it('value 超出 max 不 throw（clamp 處理）', () => {
    expect(() => render(<GaugeChart value={150} min={0} max={100} />)).not.toThrow();
  });
});
