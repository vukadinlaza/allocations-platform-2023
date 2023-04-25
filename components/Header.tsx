'use client';

import { navigation } from '@/app/config';
import { useAuthContext } from '@/app/context';
import { Chip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AvatarComponent from './Avatar';
import LoadingUserItem from './Loading/UserItem';
import Logo from './Logo';

export default function Header({ loading }, { loading: boolean }) {
  const pathname = usePathname();
  const { user } = useAuthContext();
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
                  <Link href={item.href} key={item.href}>
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
                <div className="flex items-center justify-between">
                  <div className="mx-2">
                    {user.infos.is_super_admin && (
                      <Chip
                        size="small"
                        color="primary"
                        className="font-bold text-white"
                        label="Admin"
                      ></Chip>
                    )}
                  </div>
                  <div className="mr-2 select">
                    <select>
                      {user.organizations && !user.organizations.length > 0 && (
                        <option selected>No organization</option>
                      )}
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
