import { Chip } from '@mui/material';

type Status = {
  
}

export default function ChipStatus({ status }: { status: string | null | undefined }) {
  const colors: any = {
    processing: 'warning'
  };
  return (
    <Chip
      label={status}
      color={status ? colors[status.toLowerCase()] : 'grey'}
      className="text-white capitalize"
    />
  );
}
