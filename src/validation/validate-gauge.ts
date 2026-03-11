import type { ValidationResult } from '../types';

interface GaugeValidationInput {
  value: number | null;
  min?: number;
  max?: number;
}

export function validateGaugeData({
  value,
  min = 0,
  max = 100,
}: GaugeValidationInput): ValidationResult {
  // null value 是合法的（載入中狀態）
  if (value === null) {
    return { valid: true };
  }

  // NaN / Infinity 非法（與 validateSeriesData 行為一致）
  if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
    return { valid: false, reason: `Gauge value is invalid: ${value}` };
  }

  // min >= max 無效範圍
  if (min >= max) {
    return { valid: false, reason: `Gauge min (${min}) must be less than max (${max})` };
  }

  return { valid: true };
}
