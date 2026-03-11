import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

interface ChartSkeletonProps {
  height?: number;
  title?: string;
}

export function ChartSkeleton({ height = 300, title }: ChartSkeletonProps): React.ReactElement {
  return (
    <Box role="progressbar" aria-label={title ? `Loading ${title}` : 'Loading chart'}>
      <Skeleton variant="rectangular" width="100%" height={height} />
    </Box>
  );
}
