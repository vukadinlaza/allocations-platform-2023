'use client';

import { navigation } from '@/app/config';
import { useAuthContext } from '@/app/context';
import {
  fetchDeals,
  fetchEntities,
  fetchInvestments,
  fetchOrganizations
} from '@/lib/supabase';
import { Organization } from '@/types';
import { Chip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AvatarComponent from './Avatar';
import Feedback from './Feedback';
import Logo from './Logo';

export default function Header() {
  const pathname = usePathname();
  const { user, setCurrentOrganization } = useAuthContext();
  const [counts, setCounts]: any = useState(null);

  const getCount = async () => {
    if (!user) return;
    const { count: organizations } = await fetchOrganizations();
    const { count: entities } = await fetchEntities();
    const { count: deals } = await fetchDeals();
    const { count: spvs } = await fetchDeals('spv');
    const { count: funds } = await fetchDeals('fund');
    const { count: investments } = await fetchInvestments();

    setCounts({
      organizations,
      entities,
      investments,
      deals,
      spvs,
      funds
    });
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="header">
      <div className="header--main">
        <div>
          <Logo />
        </div>
        <div className="flex items-center justify-end w-full grow">
          {user && (
            <div className="flex items-center justify-end ml-4 grow">
              {user && (
                <div className="flex items-center justify-between">
                  {user.is_super_admin && (
                    <div className="mx-2">
                      {user.is_super_admin && (
                        <Chip
                          size="small"
                          color="info"
                          className="font-bold text-white"
                          label="Admin"
                        ></Chip>
                      )}
                    </div>
                  )}
                  <Feedback />
                  <div className="mr-2 select">
                    <select
                      onChange={(e) => setCurrentOrganization(e.target.value)}
                      style={{ maxWidth: '150px' }}
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
        {user &&
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
                {counts && item.showCount && (
                  <span>({counts[item.name.toLowerCase()] || 0})</span>
                )}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
