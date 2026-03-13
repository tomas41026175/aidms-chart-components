import { gaugeClasses } from '@mui/x-charts/Gauge';
import type { GaugeChartProps } from '../types';

const ARC_MAP = {
  half: { startAngle: -110, endAngle: 110 },
  full: { startAngle: 0, endAngle: 360 },
};

interface GaugeMuiProps {
  value: number | null;
  valueMin: number;
  valueMax: number;
  startAngle: number;
  endAngle: number;
  text: (args: { value: number | null }) => string;
  sx: Record<string, unknown>;
  skipAnimation: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

const TEXT_OFFSET: Record<'half' | 'full', string> = {
  half: 'translate(0, 10px)',
  full: 'translate(0, 0)',
};

function buildSx(color: string, arc: 'half' | 'full'): Record<string, unknown> {
  return {
    [`& .${gaugeClasses.valueArc}`]: { fill: color },
    [`& .${gaugeClasses.valueText}`]: { transform: TEXT_OFFSET[arc] },
  };
}

function buildTextSx(arc: 'half' | 'full'): Record<string, unknown> {
  return {
    [`& .${gaugeClasses.valueText}`]: { transform: TEXT_OFFSET[arc] },
  };
}

export function toGaugeProps(props: GaugeChartProps): GaugeMuiProps {
  const {
    value,
    min = 0,
    max = 100,
    arc = 'half',
    color,
    formatValue,
    animate = true,
  } = props;

  const { startAngle, endAngle } = ARC_MAP[arc];

  // Clamp value if not null
  const clampedValue = value !== null ? clamp(value, min, max) : null;

  // Color resolution + text offset
  let sx: Record<string, unknown> | undefined;
  if (clampedValue !== null && color !== undefined) {
    const resolvedColor =
      typeof color === 'function' ? color(clampedValue) : color;
    sx = buildSx(resolvedColor, arc);
  } else {
    sx = buildTextSx(arc);
  }

  // Text function
  const text = ({ value: v }: { value: number | null }): string => {
    if (v === null) return '--';
    if (formatValue !== undefined) return formatValue(v);
    return `${v}%`;
  };

  return {
    value: clampedValue,
    valueMin: min,
    valueMax: max,
    startAngle,
    endAngle,
    text,
    sx,
    skipAnimation: !animate,
  };
}
