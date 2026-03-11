import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@mui/material',
    '@mui/material/Skeleton',
    '@mui/material/Typography',
    '@mui/material/Box',
    '@mui/x-charts',
    '@mui/x-charts/LineChart',
    '@mui/x-charts/BarChart',
    '@mui/x-charts/Gauge',
    '@mui/x-charts/Gauge/gaugeClasses',
    '@emotion/react',
    '@emotion/styled',
  ],
});
