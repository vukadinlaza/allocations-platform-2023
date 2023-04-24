'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/app/config';
import Logo from './Logo';
import AvatarComponent from './Avatar';
import LoadingUserItem from './Loading/UserItem';
import { useAuthContext } from '@/app/context';

export default function Header({ loading }, { loading: boolean }) {
  const pathname = usePathname();
  const { user, currentOrganization } = useAuthContext();
  console.log(user);
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
              {user && (
                <div className="flex items-center justify-between w-48">
                  <p>{currentOrganization}</p>
                  <div className="select">
                    <select>
                      {user.organizations &&
                        user.organizations.map((organization) => (
                          <option
                            className="text-xs"
                            key={organization.id}
                            value={organization.id}
                          >
                            {organization.legal_name || 'No organization found'}
                          </option>
                        ))}
                    </select>
                  </div>
                  <AvatarComponent />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
