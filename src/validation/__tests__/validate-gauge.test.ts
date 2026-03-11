import { describe, it, expect } from 'vitest';
import { validateGaugeData } from '../validate-gauge';

describe('validateGaugeData', () => {
  it('有效數值 -> valid', () => {
    expect(validateGaugeData({ value: 50, min: 0, max: 100 }).valid).toBe(true);
  });

  it('null value -> valid（代表載入中狀態，由 Rendering Layer 顯示 "--"）', () => {
    expect(validateGaugeData({ value: null, min: 0, max: 100 }).valid).toBe(true);
  });

  it('min >= max -> invalid（無效量測範圍）', () => {
    const result = validateGaugeData({ value: 50, min: 100, max: 0 });
    expect(result.valid).toBe(false);
  });

  it('NaN value -> invalid（格式錯誤，非合法缺值）', () => {
    const result = validateGaugeData({ value: NaN, min: 0, max: 100 });
    expect(result.valid).toBe(false);
  });

  it('Infinity value -> invalid（與 validateSeriesData 行為一致）', () => {
    const result = validateGaugeData({ value: Infinity, min: 0, max: 100 });
    expect(result.valid).toBe(false);
  });
});
