'use client';
import FundManagerDashboard from '@/components/Dashboards/FundManager';
import InvestorDashboard from '@/components/Dashboards/Investor';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context';

export default function Dashboard() {
  const { supabase } = useSupabase();
  const { user } = useAuthContext();
  const [active, setActive] = useState('Investor');
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const tabs = [{ key: 'Investor' }, { key: 'Fund manager' }];

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
    // fetchData();
  }, []);

  return (
    <div className="container home">
      {active === 'Fund Manager' && <FundManagerDashboard />}
      {active === 'Investor' && <InvestorDashboard />}
    </div>
  );
}
