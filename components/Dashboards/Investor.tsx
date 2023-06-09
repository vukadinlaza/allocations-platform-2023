import Investments from '@/components/Investments';
import { useSupabase } from '@/lib/supabase-provider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../Button';
import DataCard from '../Data/Card';
import LoadingDashboard from '../Loading/Dashboard';

type Props = {
  handleSwitch: () => any;
};

export default function InvestorDashboard({ handleSwitch }: Props) {
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
    <div className="w-full">
      {loading && <LoadingDashboard />}
      {!loading && (
        <div className="w-full">
          <header className="mb-8">
            <div className="items-start justify-between mb-8 md:flex">
              <h1 className="mb-2 text-xl font-bold md:text-3xl">
                Investor Dashboard
              </h1>
              <Button
                color={'info'}
                label={'Switch to Fund Manager'}
                icon={
                  <Image
                    src="/switch.svg"
                    alt={'switch'}
                    className="opacity-50"
                    width={20}
                    height={20}
                  />
                }
                onClick={() => handleSwitch()}
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:gap-4 md:grid-cols-5">
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
