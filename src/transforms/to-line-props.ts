import type { LineChartProps } from '../types';

type CurveType = 'smooth' | 'linear' | 'step';
type MuiCurve = 'monotoneX' | 'linear' | 'step';

const CURVE_MAP: Record<CurveType, MuiCurve> = {
  smooth: 'monotoneX',
  linear: 'linear',
  step: 'step',
};

function detectScaleType(labels: (string | number | Date)[]): 'time' | 'linear' | 'point' {
  if (labels.length === 0) return 'point';
  const first = labels[0];
  if (first instanceof Date) return 'time';
  if (typeof first === 'number') return 'linear';
  return 'point';
}

interface LineChartMuiProps {
  series: Array<{
    data: (number | null)[];
    label: string;
    color?: string;
    curve: MuiCurve;
    showMark: boolean;
    area?: boolean;
    connectNulls?: boolean;
  }>;
  xAxis: Array<Record<string, unknown>>;
  yAxis: Array<Record<string, unknown>>;
  skipAnimation: boolean;
}

export function toLineChartProps(props: LineChartProps): LineChartMuiProps {
  const {
    labels,
    datasets,
    curve = 'smooth',
    fill = false,
    yRange,
    connectNulls,
    animate = true,
    slotProps,
  } = props;

  const scaleType = detectScaleType(labels);
  const muiCurve = CURVE_MAP[curve];
  const showMark = labels.length <= 30;

  const series = datasets.map((dataset) => ({
    data: dataset.data,
    label: dataset.label,
    ...(dataset.color !== undefined && { color: dataset.color }),
    curve: muiCurve,
    showMark,
    ...(fill && { area: true }),
    ...(connectNulls !== undefined && { connectNulls }),
  }));

  const xAxisBase: Record<string, unknown> = {
    scaleType,
    data: labels,
  };
  const xAxisSlot = slotProps?.xAxis ?? {};
  const xAxis = [{ ...xAxisSlot, ...xAxisBase }];

  const yAxisBase: Record<string, unknown> = {};
  if (yRange !== undefined) {
    yAxisBase.min = yRange[0];
    yAxisBase.max = yRange[1];
  }
  const yAxisSlot = slotProps?.yAxis ?? {};
  const yAxis = [{ ...yAxisSlot, ...yAxisBase }];

  return {
    series,
    xAxis,
    yAxis,
    skipAnimation: !animate,
  };
}
