import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Table from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';

export default function DealAdminInvestors({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [investors, setInvestors] = useState<null[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let headers = [
    // {
    //   label: 'Name',
    //   key: 'name'
    // },
    {
      label: 'E-mail',
      key: 'email',
      type: 'email'
    },
    {
      label: 'Subscription amount',
      key: 'subscription_amount',
      type: 'price'
    },
    {
      label: 'Capital wired',
      key: 'capital_wired_amount',
      type: 'price'
    },
    {
      label: 'Status',
      key: 'status',
      type: 'chip'
    }
    // {
    //   label: 'Documents',
    //   key: 'documents'
    // }
  ];

  const fetchInvestors = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data: investments, error } = await supabase
        .from('investments')
        .select('*, users(*)')
        .eq('deal_id', deal.id)
        .neq('status', 'archived');

      if (investments) {
        setInvestors(
          investments.map((invest) => ({
            ...invest.users,
            name: invest.users
              ? `${invest.users.first_name ?? ''} ${
                  invest.users.last_name ?? ''
                }`.trim()
              : null,
            status: invest.status,
            subscription_amount: invest.subscription_amount,
            documents: 'None'
          }))
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInvestors();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && !investors.length && <None text="No investors yet." />}
      {!loading && investors.length > 0 && (
        <Table data={investors} headers={headers} />
      )}
    </div>
  );
}
