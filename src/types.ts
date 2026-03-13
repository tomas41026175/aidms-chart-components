// Public API types for @aidms/chart-components

export interface Dataset {
  label: string;
  data: (number | null)[];
  color?: string;
}

export interface ChartBaseProps {
  height?: number;
  title?: string;
  animate?: boolean;
}

export interface LineChartProps extends ChartBaseProps {
  labels: (string | number | Date)[];
  datasets: Dataset[];
  curve?: 'smooth' | 'linear' | 'step';
  fill?: boolean;
  yRange?: [number, number];
  connectNulls?: boolean;
  slotProps?: {
    xAxis?: Record<string, unknown>;
    yAxis?: Record<string, unknown>;
  };
}

export interface BarChartProps extends ChartBaseProps {
  labels: string[];
  datasets: Dataset[];
  layout?: 'vertical' | 'horizontal';
  stacked?: boolean;
  yRange?: [number, number];
  slotProps?: {
    xAxis?: Record<string, unknown>;
    yAxis?: Record<string, unknown>;
  };
}

export interface GaugeChartProps extends ChartBaseProps {
  value: number | null;
  width?: number;
  min?: number;
  max?: number;
  label?: string;
  formatValue?: (value: number) => string;
  arc?: 'half' | 'full';
  color?: string | ((value: number) => string);
  slotProps?: Record<string, unknown>;
}

// Internal validation result types
export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };
