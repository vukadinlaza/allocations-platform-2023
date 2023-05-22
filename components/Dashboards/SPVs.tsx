import DataCard from '@/components/Data/Card';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import LoadingDashboard from '../Loading/Dashboard';

export default function FundManagerDashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  // const { user } = useAuthContext();
  const [items, setItems] = useState<any>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const model = [
        {
          title: 'Total AUM',
          key: 'spvs_total_aum',
          value: 0,
          type: 'price'
        },
        {
          title: 'Total raised',
          key: 'spvs_total_raised',
          value: 0,
          type: 'price'
        },
        {
          title: 'Est. multiple',
          key: 'spvs_estimated_multiple',
          value: 0,
          unit: 'x',
          type: 'number'
        },
        {
          title: 'Total SPVs',
          key: 'spvs_total_spvs',
          value: 0,
          type: 'number'
        },
        {
          title: 'Total investors',
          key: 'spvs_total_investors',
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
    <div className="w-full">
      {loading && <LoadingDashboard />}
      {!loading && (
        <div className="w-full">
          <div className="flex items-start w-full gap-24">
            {items &&
              items.map((item: any, index: number) => (
                <DataCard key={index} item={item} />
              ))}
          </div>
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <h1>Portfolio Overview</h1>
            </div>
            <div>
              <h1>Portfolio Value</h1>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}
