import { Chip } from '@mui/material';

export default function ChipStatus({ status }: { status: string | null | undefined }) {
  const colors: any = {
    processing: 'warning'
  };
  return (
    <Chip
      label={status}
      color={status ? colors[status.toLowerCase()] : 'warning'}
      className="text-white capitalize"
    />
  );
}
