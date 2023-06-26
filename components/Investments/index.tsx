'use client';

import Button from '@/components/Button';
import ChipStatus from '@/components/ChipStatus';
import InvestmentsItem from '@/components/Investments/Item';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import PageHeader from '@/components/Page/Header';
import { openURL } from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { investments_status } from '@/types/values';
import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';

const limitation = 25;

export default function Investments() {
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [selected, setSelected] = useState<string>('signed');
  const [asc, setAsc] = useState<any>('desc');
  const [order, setOrder] = useState<any>('subscription_amount');
  const [limit, setLimit] = useState<number>(limitation);
  const [loading, setLoading] = useState(true);
  const { fetchInvestments, supabase } = useSupabase();

  const getInvestments = async () => {
    setInvestments([]);
    try {
      setLoading(true);
      let { data, error } = await fetchInvestments();
      if (data) {
        setInvestments(data);
        setFilteredInvestments(data.filter((x: any) => x.status === 'signed'));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvestments();
  }, []);

  useEffect(() => {
    setLimit(limitation);
    setFilteredInvestments(
      investments.filter((x: any) => x.status === selected)
    );
  }, [selected]);

  return (
    <div className="container container--card">
      {loading && <LoadingList />}
      {!loading && (
        <div className="w-full">
          <PageHeader
            header={{
              name: 'Investments',
              description: 'Manage your investments.',
              length: investments.length
            }}
          />
          <div className="flex gap-2 filters">
            <div className="flex gap-2 mb-6 capitalize">
              {investments_status
                .filter((x) => x !== 'invited')
                .map((status) => (
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
          {filteredInvestments.length > 0 && (
            <div>
              <div className="grid gap-2">
                {orderBy(filteredInvestments, [order], [asc])
                  .slice(0, limit)
                  .map((investment: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => openURL(`investments/${investment.id}`)}
                    >
                      <InvestmentsItem investment={investment} />
                    </div>
                  ))}
              </div>
              {filteredInvestments.length > limitation && (
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
          {filteredInvestments.length === 0 && (
            <None text="No investments yet." />
          )}
        </div>
      )}
    </div>
  );
}
