import LinearProgress from '@mui/material/LinearProgress';

export default function Progress({
  value,
  footer
}: {
  value: any;
  footer?: any;
}) {
  return (
    <div className="w-full">
      <LinearProgress
        sx={{ height: 24, borderRadius: 4 }}
        variant="determinate"
        value={value}
      />
      {footer}
    </div>
  );
}
