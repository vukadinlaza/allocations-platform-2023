'use client';

import { headers_tables } from '@/app/config';
import DataCard from '@/components/Data/Card';
import LoadingButtons from '@/components/Loading/Buttons';
import LoadingList from '@/components/Loading/List';
import Nav from '@/components/Nav';
import { useSupabase } from '@/lib/supabase-provider';
import { getFullName } from '@/lib/utils';
import { Card, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context';

export default function Dashboard() {
  const { supabase } = useSupabase();
  const { user } = useAuthContext();
  const [active, setActive] = useState('SPVs');
  const [items, setItems] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState<any>({
    headersTable: headers_tables.spvs,
    queryType: 'spv',
    table: 'limited_deals',
    type: 'spv'
  });
  const [loading, setLoading] = useState<boolean>(false);

  const tabs = [{ key: 'SPVs' }, { key: 'Funds' }, { key: 'Investments' }];

  const fetchData = async () => {
    try {
      setLoading(true);
      const model = [
        {
          title: 'Total raised',
          key: 'total_investments_raised',
          value: 0,
          type: 'price'
        },
        {
          title: 'Total deals',
          key: '',
          value: 0,
          type: 'number'
        },
        {
          title: 'Total investors',
          key: '',
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
    if (active === 'SPVs') {
      return setSelectedTab({
        headersTable: headers_tables.spvs,
        queryType: 'spv',
        table: 'limited_deals',
        type: 'spv'
      });
    }
    if (active === 'Funds') {
      return setSelectedTab({
        headersTable: headers_tables.funds,
        queryType: 'fund',
        table: 'limited_deals',
        type: 'fund'
      });
    }
    if (active === 'Investments') {
      return setSelectedTab({
        headersTable: headers_tables.investments,
        table: 'hydrated_investments',
        type: 'investment'
      });
    }
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
          <header className="mt-4 mb-8">
            <h1 className="mb-4">
              Welcome back{' '}
              <span className="ml-2 text-primary-500">{getFullName(user)}</span>
            </h1>
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
            <div className="card">
              {/* <PageList
                hideHeader={true}
                headersTable={selectedTab.headersTable}
                query={`*`}
                queryType={selectedTab.queryType}
                table={selectedTab.table}
                type={selectedTab.type}
              /> */}
            </div>
          </Card>
        </div>
      )}
    </Grid>
  );
}
