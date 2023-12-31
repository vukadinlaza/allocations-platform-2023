'use client';
import { getFirstLetter } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthContext } from '../app/(private)/context';

interface MenuItem {
  title: string;
  action: Function;
}

export default function AvatarComponent() {
  const { user, signOut } = useAuthContext();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menu: MenuItem[] = [
    {
      title: 'My profile',
      action: () => {
        router.push('/profile');
      }
    },
    {
      title: 'Logout',
      action: async () => {
        await signOut();
      }
    }
  ];

  const handleClick = async (item: MenuItem) => {
    if (item.action) {
      await item.action();
    }
    setOpen(false);
  };

  return (
    <div className="relative avatar">
      <Avatar
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
        sx={{
          width: 40,
          height: 40,
          backgroundColor: '#3db278',
          textTransform: 'capitalize'
        }}
      >
        {getFirstLetter(user.email)}
      </Avatar>
      {open && menu && (
        <div className="absolute right-0 bg-white border top-12 z-[1000]">
          <header className="px-4 py-3 border-b">
            <label htmlFor="{user.email}">{user.email}</label>
          </header>
          <MenuList>
            {menu &&
              menu.map((item, index) => (
                <MenuItem key={index} onClick={() => handleClick(item)}>
                  {item.title}
                </MenuItem>
              ))}
          </MenuList>
        </div>
      )}
    </div>
  );
}
