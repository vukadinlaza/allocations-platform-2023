'use client';

import { headers_tables } from '@/app/config';
import Button from '@/components/Button';
import DataCard from '@/components/Data/Card';
import LoadingButtons from '@/components/Loading/Buttons';
import LoadingList from '@/components/Loading/List';
import Nav from '@/components/Nav';
import { useSupabase } from '@/lib/supabase-provider';
import { getFullName } from '@/lib/utils';
import { Card, Grid } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context';

export default function Dashboard() {
  const { supabase } = useSupabase();
  const { user } = useAuthContext();
  const [active, setActive] = useState('Investor dashboard');
  const [items, setItems] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState<any>({
    headersTable: headers_tables.spvs,
    queryType: 'spv',
    table: 'limited_deals',
    type: 'spv'
  });
  const [loading, setLoading] = useState<boolean>(false);

  // investments, spvs, funds, investors

  const tabs = [
    { key: 'Investor dashboard' },
    { key: 'Fund manager dashboard' }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const model = [
        {
          title: 'Investments',
          key: 'total_investments_count',
          value: 0,
          type: 'number'
        },
        {
          title: 'SPVs',
          key: 'total_spvs_count',
          value: 0,
          type: 'number'
        },
        {
          title: 'Funds',
          key: 'total_funds_count',
          value: 0,
          type: 'number'
        },
        {
          title: 'Total investors',
          key: 'total_investors_count',
          value: 0,
          type: 'number'
        }
      ];
      for (const item of model) {
        const { data: value, error } = await supabase.rpc(item.key);
        item.value = value || 0;
      }
      setItems(model);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (active === 'SPVs') {
    //   return setSelectedTab({
    //     headersTable: headers_tables.spvs,
    //     queryType: 'spv',
    //     table: 'limited_deals',
    //     type: 'spv'
    //   });
    // }
    // if (active === 'Funds') {
    //   return setSelectedTab({
    //     headersTable: headers_tables.funds,
    //     queryType: 'fund',
    //     table: 'limited_deals',
    //     type: 'fund'
    //   });
    // }
    // if (active === 'Investments') {
    //   return setSelectedTab({
    //     headersTable: headers_tables.investments,
    //     table: 'hydrated_investments',
    //     type: 'investment'
    //   });
    // }
  }, [active]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container className="home">
      {loading && (
        <div className="w-full">
          <LoadingButtons />
          <LoadingList />
        </div>
      )}
      {!loading && (
        <div className="w-full">
          <header className="flex items-center justify-between mt-4 mb-8">
            <h1 className="mb-4">
              Welcome back{' '}
              <span className="ml-2 text-primary-500">{getFullName(user)}</span>
            </h1>
            <Button
              disabled={true}
              icon={
                <Image
                  src="/analytics.svg"
                  alt={'analytics'}
                  className="ml-auto opacity-50 invert"
                  width={16}
                  height={16}
                />
              }
              loading={loading}
              label="View analytics"
              onClick={() => {}}
            />
          </header>
          <Card className="w-full card" variant="outlined">
            <div className="flex items-start justify-start w-full gap-24">
              {items &&
                items.map((item: any, index: number) => (
                  <DataCard key={index} item={item} />
                ))}
            </div>
          </Card>
          <Card className="w-full" variant="outlined">
            <div className="px-4 py-4 border-b">
              <Nav
                items={tabs.map((item) => item.key)}
                active={active}
                setActive={setActive}
              />
            </div>
            <div className="card"></div>
          </Card>
        </div>
      )}
    </Grid>
  );
}
