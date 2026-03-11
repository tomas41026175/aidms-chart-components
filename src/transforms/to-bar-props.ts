import type { BarChartProps } from '../types';

const STACK_KEY = 'stacked-bar';

interface BarChartMuiProps {
  series: Array<{
    data: (number | null)[];
    label: string;
    color?: string;
    stack?: string;
  }>;
  xAxis: Array<Record<string, unknown>>;
  yAxis: Array<Record<string, unknown>>;
  layout: 'vertical' | 'horizontal';
  skipAnimation: boolean;
}

export function toBarChartProps(props: BarChartProps): BarChartMuiProps {
  const {
    labels,
    datasets,
    layout = 'vertical',
    stacked = false,
    yRange,
    animate = true,
  } = props;

  const series = datasets.map((dataset) => ({
    data: dataset.data,
    label: dataset.label,
    ...(dataset.color !== undefined && { color: dataset.color }),
    ...(stacked && { stack: STACK_KEY }),
  }));

  let xAxis: Array<Record<string, unknown>>;
  let yAxis: Array<Record<string, unknown>>;

  if (layout === 'horizontal') {
    // horizontal: labels on yAxis (scaleType: 'band'), numeric values on xAxis
    // yRange maps to xAxis (numeric axis), NOT yAxis (band scale ignores min/max)
    const xAxisBase: Record<string, unknown> = {};
    if (yRange !== undefined) {
      xAxisBase.min = yRange[0];
      xAxisBase.max = yRange[1];
    }
    xAxis = [xAxisBase];
    yAxis = [{ data: labels, scaleType: 'band' }];
  } else {
    // vertical: labels on xAxis (scaleType: 'band' required by MUI BarChart)
    xAxis = [{ data: labels, scaleType: 'band' }];
    const yAxisBase: Record<string, unknown> = {};
    if (yRange !== undefined) {
      yAxisBase.min = yRange[0];
      yAxisBase.max = yRange[1];
    }
    yAxis = [yAxisBase];
  }

  return {
    series,
    xAxis,
    yAxis,
    layout,
    skipAnimation: !animate,
  };
}
