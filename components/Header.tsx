'use client';

import { navigation } from '@/app/config';
import { useAuthContext } from '@/app/context';
import { Organization } from '@/types';
import { Chip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AvatarComponent from './Avatar';
import LoadingUserItem from './Loading/UserItem';
import Logo from './Logo';

interface HeaderProps {
  loading: boolean;
}

export default function Header({ loading }: HeaderProps) {
  const pathname = usePathname();
  const { user, setCurrentOrganization } = useAuthContext();
  console.log(user.organizations);
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
                  {user.infos && (
                    <div className="mx-2">
                      {user.infos.is_super_admin && (
                        <Chip
                          size="small"
                          color="info"
                          className="font-bold text-white"
                          label="Admin"
                        ></Chip>
                      )}
                    </div>
                  )}
                  <div className="mr-2 select">
                    <select
                      onChange={(e) => setCurrentOrganization(e.target.value)}
                    >
                      {user.organizations && user.organizations.length < 1 && (
                        <option selected>
                          {user.infos.is_super_admin
                            ? 'All organizations'
                            : 'No organization'}
                        </option>
                      )}
                      {user.organizations &&
                        user.organizations.length > 0 &&
                        user.organizations.map((organization: Organization) => (
                          <option
                            className="text-xs"
                            key={organization.id}
                            value={organization.id}
                          >
                            {organization.name ||
                              organization.legal_name ||
                              'No organization found'}
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
