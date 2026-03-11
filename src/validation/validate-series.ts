import type { Dataset, ValidationResult } from '../types';

export function validateSeriesData(
  labels: (string | number | Date)[],
  datasets: Dataset[]
): ValidationResult {
  // 空 datasets
  if (datasets.length === 0) {
    const result: ValidationResult = {
      valid: false,
      reason: 'datasets must not be empty',
    };
    if (import.meta.env?.MODE !== 'production') {
      console.error('[chart-components] validateSeriesData:', result.reason);
    }
    return result;
  }

  // 各 dataset 長度比對
  for (const dataset of datasets) {
    // 長度不一致
    if (dataset.data.length !== labels.length) {
      const result: ValidationResult = {
        valid: false,
        reason: `Series "${dataset.label}" has ${dataset.data.length} data points but labels has ${labels.length}`,
      };
      if (import.meta.env?.MODE !== 'production') {
        console.error('[chart-components] validateSeriesData:', result.reason);
      }
      return result;
    }

    // NaN / Infinity 檢查（null 跳過，是合法缺值）
    for (const value of dataset.data) {
      if (value === null) continue;
      if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
        const result: ValidationResult = {
          valid: false,
          reason: `Series "${dataset.label}" contains invalid value: ${value}`,
        };
        if (import.meta.env?.MODE !== 'production') {
          console.error('[chart-components] validateSeriesData:', result.reason);
        }
        return result;
      }
    }
  }

  return { valid: true };
}
