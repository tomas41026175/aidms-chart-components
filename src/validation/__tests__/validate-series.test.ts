import { describe, it, expect, vi } from 'vitest';
import { validateSeriesData } from '../validate-series';

describe('validateSeriesData', () => {
  // --- 合法情況 ---

  it('labels 與 datasets[].data 長度一致 -> valid', () => {
    const result = validateSeriesData(
      ['Jan', 'Feb', 'Mar'],
      [{ label: 'CPU', data: [10, 20, 30] }]
    );
    expect(result.valid).toBe(true);
  });

  it('多組 datasets 長度均一致 -> valid', () => {
    const result = validateSeriesData(
      [1, 2, 3],
      [
        { label: 'CPU', data: [10, 20, 30] },
        { label: 'MEM', data: [40, 50, 60] },
      ]
    );
    expect(result.valid).toBe(true);
  });

  it('data 含 null -> valid（null 是合法缺值，折線斷點）', () => {
    const result = validateSeriesData(
      ['Jan', 'Feb', 'Mar'],
      [{ label: 'CPU', data: [10, null, 30] }]
    );
    expect(result.valid).toBe(true);
  });

  it('空 data 陣列（length 0）-> valid（由 Rendering Layer 顯示 Skeleton）', () => {
    const result = validateSeriesData(
      [],
      [{ label: 'CPU', data: [] }]
    );
    expect(result.valid).toBe(true);
  });

  // --- 非法情況 ---

  it('空 datasets 陣列 -> invalid，reason 含 "datasets"', () => {
    const result = validateSeriesData(['Jan', 'Feb'], []);
    expect(result.valid).toBe(false);
    expect(result).toMatchObject({
      valid: false,
      reason: expect.stringContaining('datasets'),
    });
  });

  it('data 長度與 labels 不一致 -> invalid，reason 含 series name 和兩邊長度', () => {
    const result = validateSeriesData(
      ['Jan', 'Feb', 'Mar'],
      [{ label: 'CPU', data: [10, 20] }]
    );
    expect(result.valid).toBe(false);
    const reason = (result as { valid: false; reason: string }).reason;
    expect(reason).toContain('CPU');
    expect(reason).toContain('2');
    expect(reason).toContain('3');
  });

  it('data 含 NaN -> invalid', () => {
    const result = validateSeriesData(
      ['a', 'b'],
      [{ label: 'X', data: [1, NaN] }]
    );
    expect(result.valid).toBe(false);
  });

  it('data 含 Infinity -> invalid', () => {
    const result = validateSeriesData(
      ['a', 'b'],
      [{ label: 'X', data: [1, Infinity] }]
    );
    expect(result.valid).toBe(false);
  });

  it('開發模式驗證失敗 -> console.error 被呼叫（DX 提醒）', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    validateSeriesData(['a'], [{ label: 'X', data: [1, 2] }]);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
