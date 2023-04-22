'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/app/config';
import Logo from './Logo';
import AvatarComponent from './Avatar';
import LoadingUserItem from './Loading/UserItem';

export default function Header({ loading }, { loading: boolean }) {
  const pathname = usePathname();
  return (
    <div className="Header">
      <div className="container flex items-center justify-center w-full">
        <div>
          <Logo />
        </div>
        <div className="flex items-center justify-end w-full grow">
          {loading && (
            <div
              className="flex items-center justify-end grow"
              style={{ maxWidth: '300px' }}
            >
              <LoadingUserItem />
            </div>
          )}
          {!loading && (
            <div className="flex items-center justify-end ml-4 grow">
              <div className="Header--menu grow">
                {navigation.map((item) => (
                  <Link href={item.href}>
                    <div
                      className={`Header--menu--item ${
                        pathname?.includes(item.name.toLowerCase())
                          ? 'active'
                          : 'inactive'
                      }`}
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
              <AvatarComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
