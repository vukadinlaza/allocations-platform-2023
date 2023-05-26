import { getFirstLetter } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';

export default function AvatarItem({
  item,
  showAdress = true,
  size = 32
}: {
  item: string | undefined | null;
  showAdress?: boolean;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        className={`${showAdress ? 'mr-2' : ''} cursor-pointer`}
        sx={{
          width: size,
          height: size,
          backgroundColor: '#3db278',
          textTransform: 'capitalize'
        }}
      >
        {getFirstLetter(item)}
      </Avatar>
      {showAdress && <div className="grow">{item && <p>{item}</p>}</div>}
    </div>
  );
}
