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
    <div className="item">
      <Avatar
        className="mr-2 cursor-pointer"
        sx={{
          width: 32,
          height: 32,
          backgroundColor: '#3db278',
          textTransform: 'capitalize'
        }}
      >
        {user?.email && getFirstLetter(user.email)}
      </Avatar>
      <div className="grid items-start pr-2 cursor-pointer grow">
        <span className="text-sm font-medium truncate">
          {user && getFullName(user)}
        </span>
        {user?.email && (
          <label className="truncate cursor-pointer">{user.email}</label>
        )}
      </div>
      {content && (
        <div className="flex flex-col items-end justify-end">{content}</div>
      )}
    </div>
  );
}
