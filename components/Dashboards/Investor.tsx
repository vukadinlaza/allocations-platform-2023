import DealsFunds from '@/components/Deals/Funds';
import DealsSPVs from '@/components/Deals/SPVs';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import DataCard from '../Data/Card';
import LoadingDashboard from '../Loading/Dashboard';
import Nav from '../Nav';

export default function InvestorDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const [items, setItems] = useState<any>([]);
  const [active, setActive] = useState('SPVs');
  const list = [{ key: 'SPVs' }, { key: 'Funds' }];

  const fetchData = async () => {
    try {
      setLoading(true);
      const model = [
        {
          title: 'Portfolio value',
          key: 'investments_portfolio_value',
          value: 0,
          type: 'price'
        },
        {
          title: 'Total invested',
          key: 'investments_total_invested',
          value: 0,
          type: 'price'
        },
        {
          title: 'Est. multiple',
          key: 'investments_estimated_multiple',
          value: 0,
          unit: 'x',
          type: 'number',
          format: '0,0.00'
        },
        {
          title: 'Total investments',
          key: 'total_investments_count',
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
    <div className="w-full">
      {loading && <LoadingDashboard />}
      {!loading && (
        <div className="w-full">
          <header className="mb-12">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </header>
          <div className="flex items-start w-full gap-24">
            {items &&
              items.map((item: any, index: number) =>
                item.value > 0 ? <DataCard key={index} item={item} /> : null
              )}
          </div>
          <div className="mb-8">
            <Nav
              items={list.map((item) => item.key)}
              active={active}
              setActive={setActive}
            />
          </div>
          {active === 'SPVs' && <DealsSPVs />}
          {active === 'Funds' && <DealsFunds />}
        </div>
      )}
    </div>
  );
}
