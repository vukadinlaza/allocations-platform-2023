'use client';

import { headers_tables } from '@/app/config';
import DataCard from '@/components/Data/Card';
import LoadingButtons from '@/components/Loading/Buttons';
import LoadingList from '@/components/Loading/List';
import Nav from '@/components/Nav';
import PageList from '@/components/Page/List';
import { getFullName } from '@/lib/utils';
import { Card, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context';

export default function Dashboard() {
  const [active, setActive] = useState('SPVs');
  const [selectedTab, setSelectedTab] = useState<any>({
    headersTable: headers_tables.spvs,
    queryType: 'spv',
    table: 'limited_deals',
    type: 'spv'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const items = [
    {
      title: 'Total raised',
      key: 'total_assets',
      value: 100000,
      type: 'price'
    },
    {
      title: 'Total private funds',
      key: 'total_private_funds',
      value: 100000,
      type: 'number'
    },
    {
      title: 'Total investors',
      key: 'total_investors',
      value: 100000,
      type: 'number'
    }
  ];

  const tabs = [
    { key: 'SPVs' },
    { key: 'Funds' },
    { key: 'Personal Investments' }
  ];

  useEffect(() => {
    console.log(active);
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
    if (active === 'Personal Investments') {
      return setSelectedTab({
        headersTable: headers_tables.investments,
        table: 'hydrated_investments',
        type: 'investment'
      });
    }
  }, [active]);

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
              {items.map((item, index) => (
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
              <PageList
                hideHeader={true}
                headersTable={selectedTab.headersTable}
                query={`*`}
                queryType={selectedTab.queryType}
                table={selectedTab.table}
                type={selectedTab.type}
              />
            </div>
          </Card>
        </div>
      )}
    </Grid>
  );
}
