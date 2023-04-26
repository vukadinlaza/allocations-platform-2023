'use client';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../app/context';

export default function AvatarComponent() {
  const { user } = useAuthContext();
  const router = useRouter();
  const getFirstLetter = () => {
    if (!user) return 'A';
    return user.email[0];
  };
  return (
    <Avatar
      className="cursor-pointer"
      onClick={() => router.push('/')}
      sx={{
        width: 40,
        height: 40,
        backgroundColor: '#3db278',
        textTransform: 'capitalize'
      }}
    >
      {getFirstLetter()}
    </Avatar>
  );
}
