import DealsFunds from '@/components/Deals/Funds';
import DealsMigrations from '@/components/Deals/Migrations';
import DealsSPVs from '@/components/Deals/SPVs';
import { useSupabase } from '@/lib/supabase-provider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../Button';
import LoadingDashboard from '../Loading/Dashboard';
import Nav from '../Nav';
import DataCard from './Analytics/Card';

type Props = {
  handleSwitch: () => any;
};

export default function FundManagerDashboard({ handleSwitch }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const [items, setItems] = useState<any>([]);
  const [active, setActive] = useState('SPVs');
  const list = [{ key: 'SPVs' }, { key: 'Funds' }, { key: 'Migrations' }];

  const fetchData = async () => {
    try {
      setLoading(true);
      const model = [
        {
          title: 'Total AUM',
          key: 'deals_total_aum',
          value: 0,
          type: 'price'
        },
        {
          title: 'Total subscribed',
          key: 'deals_total_raised',
          value: 0,
          type: 'price'
        },
        {
          title: 'Est. multiple',
          key: 'deals_estimated_multiple',
          value: 0,
          unit: 'x',
          type: 'number',
          format: '0,0.00'
        },
        {
          title: 'Total private funds',
          key: 'deals_total_funds',
          value: 0,
          type: 'number'
        },
        {
          title: 'Total investors',
          key: 'deals_total_investors',
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
              <h1 className="mb-2 text-xl font-medium md:text-xl">
                Fund Manager Dashboard
              </h1>
              <Button
                color={'info'}
                label={'Switch to investor'}
                icon={
                  <Image
                    src="/switch.svg"
                    alt={'switch'}
                    className="text-xs opacity-50 md:text-base"
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
            <Nav
              items={list.map((item) => item.key)}
              active={active}
              setActive={setActive}
            />
          </div>
          {active === 'SPVs' && <DealsSPVs />}
          {active === 'Funds' && <DealsFunds />}
          {active === 'Migrations' && <DealsMigrations />}
        </div>
      )}
    </div>
  );
}
