import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ChartErrorProps {
  reason: string;
  height?: number;
}

export function ChartError({ reason, height = 300 }: ChartErrorProps): JSX.Element {
  return (
    <Box
      role="alert"
      aria-label="Chart error"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        border: '1px dashed',
        borderColor: 'error.main',
        borderRadius: 1,
        p: 2,
      }}
    >
      <Typography variant="body2" color="error" textAlign="center">
        {reason}
      </Typography>
    </Box>
  );
}
