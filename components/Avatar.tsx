'use client';
import * as React from 'react';
import { Avatar } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '../app/context';

export default function AvatarComponent() {
  // const { user } = useAuthContext();
  let user;
  const router = useRouter();
  const getFirstLetter = () => {
    if (!user) return 'A';
    return user.email[0];
  };
  return (
    <Avatar
      className="pointer"
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
