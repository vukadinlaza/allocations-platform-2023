import { getFirstLetter } from '@/components/Avatar';
import { Avatar } from '@mui/material';

export default function AvatarItem({ item }: { item: string | null }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        className="mr-2 cursor-pointer"
        sx={{
          width: 32,
          height: 32,
          backgroundColor: '#3db278',
          textTransform: 'capitalize'
        }}
      >
        {getFirstLetter(item)}
      </Avatar>
      <div className="grow">{item && <p>{item}</p>}</div>
    </div>
  );
}
