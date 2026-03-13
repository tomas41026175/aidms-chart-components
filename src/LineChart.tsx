import { useMemo } from 'react';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import { ChartSkeleton } from './fallbacks/ChartSkeleton';
import { ChartError } from './fallbacks/ChartError';
import { validateSeriesData } from './validation/validate-series';
import { toLineChartProps } from './transforms/to-line-props';
import type { LineChartProps } from './types';

export function LineChart(props: LineChartProps): JSX.Element {
  const { labels, datasets, height = 300, title,
          curve, fill, yRange, connectNulls, animate, slotProps } = props;

  const isEmpty = datasets.length === 0 || datasets.every((d) => d.data.length === 0);

  const validation = useMemo(
    () => (isEmpty ? { valid: true as const } : validateSeriesData(labels, datasets)),
    [isEmpty, labels, datasets]
  );

  const muiProps = useMemo(() => {
    if (isEmpty || !validation.valid) return null;
    return toLineChartProps({ labels, datasets, curve, fill, yRange, connectNulls, animate, slotProps });
  }, [isEmpty, validation.valid, labels, datasets, curve, fill, yRange, connectNulls, animate, slotProps]);

  if (isEmpty) {
    return <ChartSkeleton height={height} title={title} />;
  }

  if (!validation.valid) {
    return <ChartError reason={validation.reason} height={height} />;
  }

  return (
    <div role="img" aria-label={title ?? 'Line chart'}>
      {title && (
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, opacity: 0.85 }}>
          {title}
        </div>
      )}
      <MuiLineChart
        height={height}
        series={muiProps!.series}
        xAxis={muiProps!.xAxis}
        yAxis={muiProps!.yAxis}
        skipAnimation={muiProps!.skipAnimation}
      />
    </div>
  );
}
