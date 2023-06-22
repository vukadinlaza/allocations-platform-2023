'use client';

import ChipStatus from '@/components/ChipStatus';
import LoadingList from '@/components/Loading/List';
import ModalButton from '@/components/Modal/Button';
import PageHeader from '@/components/Page/Header';
import { openURL } from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { uniq } from 'lodash';
import { useEffect, useState } from 'react';
import DealItem from '../Item';
import NewDeal from '../New';

export default function SPVS() {
  const [deals, setDeals] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [selected, setSelected] = useState('All');
  const [filters, setFilters] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const { fetchDeals, supabase } = useSupabase();

  const getSPVs = async () => {
    setDeals([]);
    setFilters(['All']);
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
    getSPVs();
  }, []);

  useEffect(() => {
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
                content={<NewDeal type={'deals'} onCreate={() => {}} />}
                // content={<NewOrganization onCreate={() => {}} />}
              />
            }
          />
          <div className="flex gap-2 mb-6 capitalize">
            {filters.map((status) => (
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
          <div className="grid gap-2">
            {filteredDeals.map((deal: any, index: number) => (
              <div key={index} onClick={() => openURL(`deals/${deal.id}`)}>
                <DealItem deal={deal} details={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
