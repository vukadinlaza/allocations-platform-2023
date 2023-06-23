'use client';

import Button from '@/components/Button';
import LoadingList from '@/components/Loading/List';
import ModalButton from '@/components/Modal/Button';
import PageHeader from '@/components/Page/Header';
import { useSupabase } from '@/lib/supabase-provider';
import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';
import DealItem from '../Item';
import NewDeal from '../New';

const limitation = 25;

export default function Migrations() {
  const [deals, setDeals] = useState<any>([]);
  const [limit, setLimit] = useState<number>(limitation);
  const [loading, setLoading] = useState(true);
  const { supabase } = useSupabase();

  const getMigrations = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from('private_deals')
        .select(`*`, { count: 'exact' })
        .eq('is_migration', true);

      if (data) {
        setDeals(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDeals([]);
    getMigrations();
  }, []);

  return (
    <div className="container container--card">
      {loading && <LoadingList />}
      {!loading && (
        <div className="w-full">
          <PageHeader
            header={{
              name: 'Migrations',
              description: 'Manage your migrations.',
              length: deals.length
            }}
            content={
              <ModalButton
                title="Create a new Migration"
                content={
                  <NewDeal
                    selectType={true}
                    isMigration={true}
                    onCreate={() => {}}
                  />
                }
              />
            }
          />
          <div className="grid gap-2">
            {orderBy(deals, ['created_at'], ['desc'])
              .slice(0, limit)
              .map((deal: any, index: number) => (
                <div key={index}>
                  <DealItem deal={deal} details={true} />
                </div>
              ))}
          </div>
          {deals.length > limitation && (
            <div className="mt-6">
              <Button
                color="info"
                small={true}
                onClick={() => setLimit(limit + limitation)}
                label={'Load more'}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
