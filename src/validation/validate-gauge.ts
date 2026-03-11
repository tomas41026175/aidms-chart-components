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

  // NaN 非法
  if (typeof value === 'number' && isNaN(value)) {
    return { valid: false, reason: `Gauge value is NaN` };
  }

  // min >= max 無效範圍
  if (min >= max) {
    return { valid: false, reason: `Gauge min (${min}) must be less than max (${max})` };
  }

  return { valid: true };
}
