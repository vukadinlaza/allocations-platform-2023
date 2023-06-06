import { getFirstLetter, getFullName } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';

export default function UserItem({ user }: { user: any }) {
  return (
    <div className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
      <Avatar
        className="mr-2 cursor-pointer"
        sx={{
          width: 32,
          height: 32,
          backgroundColor: '#3db278',
          textTransform: 'capitalize'
        }}
      >
        {getFirstLetter(user.email)}
      </Avatar>
      <div className="flex flex-col grow">{getFullName(user)}</div>
    </div>
  );
}
