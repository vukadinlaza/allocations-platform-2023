import { getFirstLetter, getFullName } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';

export default function UserItem({
  user,
  content
}: {
  user: any;
  content?: any;
}) {
  return (
    <div className="flex items-center justify-between w-full px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
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
      <div className="flex flex-col grow">
        <span className="text-sm font-medium">{getFullName(user)}</span>
        <label>{user.email}</label>
      </div>
      {content && (
        <div className="flex flex-col items-end justify-end">{content}</div>
      )}
    </div>
  );
}
