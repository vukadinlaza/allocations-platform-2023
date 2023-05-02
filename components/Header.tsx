'use client';

import { navigation } from '@/app/config';
import { useAuthContext } from '@/app/context';
import { Organization, UserInterface } from '@/types';
import { Chip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AvatarComponent from './Avatar';
import Logo from './Logo';

interface HeaderProps {
  loading: boolean;
}

const getCount = (name: string, user: UserInterface) => {
  if (!user) return null;
  // TODO: get number of items in user coming from context
  if (name === 'Organizations')
    return <span>({user.organizations ? user.organizations.length : 0})</span>;
  if (name === 'Entities')
    return <span>({user.entities ? user.entities.length : 0})</span>;
  return null;
};

export default function Header({ loading }: HeaderProps) {
  const pathname = usePathname();
  const { user, setCurrentOrganization } = useAuthContext();
  return (
    <div className="header">
      <div className="header--main">
        <div>
          <Logo />
        </div>
        <div className="flex items-center justify-end w-full grow">
          {loading && (
            <div
              className="flex items-center justify-end grow"
              style={{ maxWidth: '300px' }}
            >
              <div className="w-32 h-4 mr-2 rounded-lg loading" />
              <div className="w-8 h-8 rounded-full loading" />
            </div>
          )}
          {!loading && (
            <div className="flex items-center justify-end ml-4 grow">
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
      <div className="header--sub">
        {loading && (
          <div className="flex items-center">
            {Array.from({ length: 6 }).map((x, i) => (
              <div key={i} className="w-32 h-5 mr-2 rounded-lg loading" />
            ))}
          </div>
        )}
        {!loading &&
          navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              <div
                className={`header--menu--item ${
                  pathname?.includes(item.name.toLowerCase())
                    ? 'active'
                    : 'inactive'
                }`}
              >
                <span className="mr-1">{item.name}</span>
                {getCount(item.name, user)}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
