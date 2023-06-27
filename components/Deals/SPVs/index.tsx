'use client';

import Button from '@/components/Button';
import ChipStatus from '@/components/ChipStatus';
import LoadingList from '@/components/Loading/List';
import ModalButton from '@/components/Modal/Button';
import PageHeader from '@/components/Page/Header';
import { useSupabase } from '@/lib/supabase-provider';
import { orderBy, uniq } from 'lodash';
import { useEffect, useState } from 'react';
import DealItem from '../Item';
import NewDeal from '../New';

const limitation = 25;

export default function SPVS() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [selected, setSelected] = useState('All');
  const [filters, setFilters] = useState(['All']);
  const [asc, setAsc] = useState<any>('desc');
  const [order, setOrder] = useState<any>('total_raised_amount');
  const [limit, setLimit] = useState<number>(limitation);
  const [loading, setLoading] = useState(true);
  const { fetchDeals, supabase } = useSupabase();

  const getSPVs = async () => {
    try {
      setLoading(true);
      let { data, error } = await fetchDeals('spv');

      if (data) {
        setDeals(data);
        setFilteredDeals(data);
      }
      setFilters((prev: any) => [
        ...prev,
        ...uniq(data.map((x: any) => x.status))
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDeals([]);
    setFilters(['All']);
    getSPVs();
  }, []);

  useEffect(() => {
    setLimit(limitation);
    if (selected === 'All') return setFilteredDeals(deals);
    setFilteredDeals(deals.filter((x: any) => x.status === selected));
  }, [selected]);

  return (
    <div className="container container--card">
      {loading && <LoadingList />}
      {!loading && (
        <div className="w-full">
          <PageHeader
            header={{
              name: 'SPVs',
              description: 'Manage your spvs.',
              length: deals.length
            }}
            content={
              <ModalButton
                title="Create a new SPV"
                content={<NewDeal type={'spv'} onCreate={() => {}} />}
              />
            }
          />
          <div className="flex gap-2 filters">
            <div className="flex gap-2 mb-6 capitalize">
              {/* {['created_at', 'total_raised_amount'].map((orderKey: any) => (
                <div
                  key={orderKey}
                  className="cursor-pointer"
                  onClick={() => setOrder(orderKey)}
                >
                  <ChipStatus
                    selected={order === orderKey}
                    toSelect={true}
                    status={orderKey}
                  />
                </div>
              ))} */}
            </div>
            <div className="flex gap-2 mb-6 capitalize">
              {[
                'All',
                'draft',
                'submitted',
                'onboarding',
                'closed',
                'archived'
              ].map((status) => (
                <div
                  key={status}
                  className="cursor-pointer"
                  onClick={() => setSelected(status)}
                >
                  <ChipStatus
                    selected={selected === status}
                    toSelect={true}
                    status={status}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            {orderBy(filteredDeals, [order], [asc])
              .slice(0, limit)
              .map((deal: any, index: number) => (
                <div key={index}>
                  <DealItem deal={deal} details={true} />
                </div>
              ))}
          </div>
          {filteredDeals.length > limitation && (
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
