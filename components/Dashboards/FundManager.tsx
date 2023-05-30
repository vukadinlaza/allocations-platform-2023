import DealsFunds from '@/components/Deals/Funds';
import DealsSPVs from '@/components/Deals/SPVs';
import { useSupabase } from '@/lib/supabase-provider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../Button';
import DataCard from '../Data/Card';
import LoadingDashboard from '../Loading/Dashboard';
import Nav from '../Nav';

type Props = {
  handleSwitch: () => any;
};

export default function FundManagerDashboard({ handleSwitch }: Props) {
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
          title: 'Total AUM',
          key: 'funds_total_aum',
          value: 0,
          type: 'price'
        },
        {
          title: 'Total raised',
          key: 'funds_total_raised',
          value: 0,
          type: 'price'
        },
        {
          title: 'Est. multiple',
          key: 'funds_estimated_multiple',
          value: 0,
          unit: 'x',
          type: 'number',
          format: '0,0.00'
        },
        {
          title: 'Total private funds',
          key: 'funds_total_funds',
          value: 0,
          type: 'number'
        },
        {
          title: 'Total investors',
          key: 'funds_total_investors',
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
            <div className="flex items-start justify-between mb-8">
              <h1 className="mb-2 text-3xl font-bold">
                Fund Manager Dashboard
              </h1>
              <Button
                color={'info'}
                label={'Switch to investor'}
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
            <div className="grid grid-cols-5 gap-4">
              {items &&
                items.map((item: any, index: number) =>
                  item.value > 0 ? <DataCard key={index} item={item} /> : null
                )}
            </div>
          </header>
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
