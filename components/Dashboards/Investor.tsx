import Investments from '@/components/Investments';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import DataCard from '../Data/Card';
import LoadingDashboard from '../Loading/Dashboard';

export default function InvestorDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const [items, setItems] = useState<any>([]);

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
    fetchData();
  }, []);

  return (
    <div className="w-full my-8">
      {loading && <LoadingDashboard />}
      {!loading && (
        <div className="w-full">
          <header className="mb-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Investor Dashboard</h1>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {items &&
                items.map((item: any, index: number) =>
                  item.value > 0 ? <DataCard key={index} item={item} /> : null
                )}
            </div>
          </header>
          <div className="mb-8">
            <Investments />
          </div>
        </div>
      )}
    </div>
  );
}
