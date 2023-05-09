'use client';

import { navigation } from '@/app/config';
import { useAuthContext } from '@/app/context';
import { Chip } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AvatarComponent from './Avatar';
import Feedback from './Feedback';
import Logo from './Logo';
import { useSupabase } from '@/lib/supabase-provider';
import Select from './Select';

export default function Header() {
  const {supabase} = useSupabase();
  const pathname = usePathname();
  const { user, organizations, setCurrentOrganization } = useAuthContext();
  const [counts, setCounts]: any = useState(null);

  const getCount = async () => {
    const organizations = await supabase
      .from('organizations')
      .select('*', { count: 'exact' })
      .then(({ count }) => count);

    const entities = await supabase
      .from('limited_entities')
      .select('*', { count: 'exact' })
      .then(({ count }) => count);

    const deals = await supabase
      .from('deals')
      .select('*', { count: 'exact' })
      .then(({ count }) => count);

    const spvs = await supabase
      .from('deals')
      .select('*', { count: 'exact' })
      .eq('type', 'spv')
      .then(({ count }) => count);

    const funds = await supabase
      .from('deals')
      .select('*', { count: 'exact' })
      .eq('type', 'fund')
      .then(({ count }) => count);

    setCounts({
      organizations,
      entities,
      deals,
      spvs,
      funds
    });
  };

  useEffect(() => {
    getCount;
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
                  <div className="w-48 mr-2 text-xs font-medium shadow-sm cursor-pointer">
                    <Select
                      items={organizations}
                      onChange={(e: any) => {
                        // setCurrentOrganization(e.target.value)
                      }}
                      displayLabel={(o: any) => o.name}
                    />
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
