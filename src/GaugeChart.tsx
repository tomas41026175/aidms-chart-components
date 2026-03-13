import { useMemo } from 'react';
import { Gauge } from '@mui/x-charts/Gauge';
import type { GaugeChartProps } from './types';
import { toGaugeProps } from './transforms/to-gauge-props';

export function GaugeChart(props: GaugeChartProps): JSX.Element {
  const { value, min = 0, max = 100, height = 200, width, title, ...rest } = props;

  const muiProps = useMemo(
    () => toGaugeProps({ value, min, max, ...rest }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, min, max, rest.arc, rest.color, rest.formatValue, rest.animate]
  );

  const clampedValue = muiProps.value;

  return (
    <div
      role="meter"
      aria-label={title ?? 'Gauge chart'}
      aria-valuenow={clampedValue !== null ? clampedValue : undefined}
      aria-valuemin={min}
      aria-valuemax={max}
    >
      {title && (
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, opacity: 0.85, textAlign: 'center' }}>
          {title}
        </div>
      )}
      {clampedValue === null ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height,
            width: width ?? height,
            fontSize: '1.5rem',
            color: 'inherit',
          }}
        >
          --
        </div>
      ) : (
        <Gauge
          height={height}
          width={width ?? height}
          value={clampedValue}
          valueMin={muiProps.valueMin}
          valueMax={muiProps.valueMax}
          startAngle={muiProps.startAngle}
          endAngle={muiProps.endAngle}
          text={muiProps.text}
          {...(muiProps.sx !== undefined && { sx: muiProps.sx })}
        />
      )}
    </div>
  );
}
