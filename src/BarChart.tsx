import { useMemo } from 'react';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { ChartSkeleton } from './fallbacks/ChartSkeleton';
import { ChartError } from './fallbacks/ChartError';
import { validateSeriesData } from './validation/validate-series';
import { toBarChartProps } from './transforms/to-bar-props';
import type { BarChartProps } from './types';

export function BarChart(props: BarChartProps): JSX.Element {
  const { labels, datasets, height = 300, title, ...rest } = props;

  const isEmpty = datasets.length === 0 || datasets.every((d) => d.data.length === 0);

  const validation = useMemo(
    () => (isEmpty ? { valid: true as const } : validateSeriesData(labels, datasets)),
    [isEmpty, labels, datasets]
  );

  const muiProps = useMemo(() => {
    if (isEmpty || !validation.valid) return null;
    return toBarChartProps({ labels, datasets, ...rest });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmpty, validation.valid, labels, datasets, rest.layout, rest.stacked, rest.yRange, rest.animate]);

  if (isEmpty) {
    return <ChartSkeleton height={height} title={title} />;
  }

  if (!validation.valid) {
    return <ChartError reason={validation.reason} height={height} />;
  }

  const isHorizontal = (rest.layout ?? 'vertical') === 'horizontal';

  return (
    <div role="img" aria-label={title ?? 'Bar chart'}>
      {title && (
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, opacity: 0.85 }}>
          {title}
        </div>
      )}
      <MuiBarChart
        height={height}
        series={muiProps!.series}
        xAxis={muiProps!.xAxis}
        yAxis={muiProps!.yAxis}
        layout={muiProps!.layout}
        skipAnimation={muiProps!.skipAnimation}
        margin={isHorizontal ? { left: 100 } : undefined}
      />
    </div>
  );
}
