import { Chip } from '@mui/material';

export default function ChipStatus({
  status
}: {
  status: string | null | undefined;
}) {
  const colors: any = {
    archived: 'primary',
    closed: 'error',
    processing: 'warning',
    build: 'warning',
    onboarding: 'info',
    complete: 'success'
  };
  return (
    <Chip
      label={status}
      color={status ? colors[status.toLowerCase()] : 'warning'}
      className="capitalize "
    />
  );
}
