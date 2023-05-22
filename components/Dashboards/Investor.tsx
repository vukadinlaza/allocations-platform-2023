import DataCard from '@/components/Data/Card';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import LoadingDashboard from '../Loading/Dashboard';

export default function InvestorDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  // const { user } = useAuthContext();
  const [items, setItems] = useState<any>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const model = [
        {
          title: 'Portfolio value',
          key: 'investments_portfolio_value',
          value: 0,
          type: 'number'
        },
        {
          title: 'Total invested',
          key: 'investments_total_invested',
          value: 0,
          type: 'number'
        },
        {
          title: 'Est. multiple',
          key: 'investments_estimated_multiple',
          value: 0,
          type: 'number'
        },
        {
          title: 'Total investments',
          key: 'total_investments_count',
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
    fetchData();
  }, []);
  return (
    <div className="w-full">
      {loading && <LoadingDashboard />}
      {!loading && (
        <div className="w-full">
          <div className="flex items-start w-full gap-24 mb-16">
            {items &&
              items.map((item: any, index: number) => (
                <DataCard key={index} item={item} />
              ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h1>Portfolio Overview</h1>
            </div>
            <div>
              <h1>Portfolio Value</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
