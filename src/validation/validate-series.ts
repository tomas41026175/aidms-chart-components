import type { Dataset, ValidationResult } from '../types';

declare const process: { env: { NODE_ENV?: string } } | undefined;

function devError(message: string): void {
  const isDev =
    typeof process === 'undefined' || process.env.NODE_ENV !== 'production';
  if (isDev) {
    console.error('[chart-components] validateSeriesData:', message);
  }
}

export function validateSeriesData(
  labels: (string | number | Date)[],
  datasets: Dataset[]
): ValidationResult {
  // 空 datasets
  if (datasets.length === 0) {
    const reason = 'datasets must not be empty';
    devError(reason);
    return { valid: false, reason };
  }

  // 各 dataset 長度比對
  for (const dataset of datasets) {
    // 長度不一致
    if (dataset.data.length !== labels.length) {
      const reason = `Series "${dataset.label}" has ${dataset.data.length} data points but labels has ${labels.length}`;
      devError(reason);
      return { valid: false, reason };
    }

    // NaN / Infinity 檢查（null 跳過，是合法缺值）
    for (const value of dataset.data) {
      if (value === null) continue;
      if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
        const reason = `Series "${dataset.label}" contains invalid value: ${value}`;
        devError(reason);
        return { valid: false, reason };
      }
    }
  }

  return { valid: true };
}
