import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Table from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';

export default function DealAdminBanking({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [transactions, setTransactions] = useState<null[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let headers = [
    {
      label: 'Date',
      key: 'date'
    },
    {
      label: 'Transaction description',
      key: 'email'
    },
    {
      label: 'Amount',
      key: 'subscription_amount'
    },
    {
      label: 'Type',
      key: 'capital_wired_amount'
    },
    {
      label: 'Status',
      key: 'status'
    }
  ];

  const fetchTransactions = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      // transactions
      // let { data: investments, error } = await supabase
      //   .from('investments')
      //   .select('*, users(*)')
      //   .eq('deal_id', deal.id);

      // if (investments) {
      //   setTransactions(
      //     investments.map((invest) => ({
      //       ...invest.users,
      //       name: `${invest.users.first_name} ${invest.users.last_name}`,
      //       status: invest.status,
      //       subscription_amount: invest.subscription_amount,
      //       documents: 'None'
      //     }))
      //   );
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && !transactions.length && <None text="No transactions yet." />}
      {!loading && transactions.length > 0 && (
        <Table data={transactions} headers={headers} />
      )}
    </div>
  );
}
