'use client';
import DashboardFunds from '@/components/Dashboards/Funds';
import DashboardInvestor from '@/components/Dashboards/Investor';
import DashboardSPV from '@/components/Dashboards/SPVs';
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
  const [active, setActive] = useState('Investor dashboard');
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const tabs = [
    { key: 'Investor dashboard' },
    { key: 'SPV dashboard' },
    { key: 'Fund dashboard' }
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
      await Promise.all(
        model.map(async (item) => {
          const { data: value, error } = await supabase.rpc(item.key);
          item.value = value || 0;
        })
      );
      setItems(model);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
          <Card className="w-full" variant="outlined">
            <header className="flex items-center justify-between px-6 pt-6">
              <h1 className="mb-4 ">
                Welcome back{' '}
                <span className="ml-2 text-primary-500">
                  {getFullName(user)}
                </span>
              </h1>
            </header>
            <div className="p-6 border-0">
              <div className="flex items-start justify-start w-full gap-24">
                {items &&
                  items.map((item: any, index: number) => (
                    <DataCard key={index} item={item} />
                  ))}
              </div>
            </div>
            <div className="w-full px-4 py-4 border-t border-b">
              <Nav
                items={tabs.map((item) => item.key)}
                active={active}
                setActive={setActive}
              />
            </div>
            <div className="w-full card">
              {active === 'Investor dashboard' && <DashboardInvestor />}
              {active === 'SPV dashboard' && <DashboardSPV />}
              {active === 'Fund dashboard' && <DashboardFunds />}
            </div>
          </Card>
        </div>
      )}
    </Grid>
  );
}
