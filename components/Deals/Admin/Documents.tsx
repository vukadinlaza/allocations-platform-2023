import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Table from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';

export default function DealAdminDocuments({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [documents, setDocuments] = useState<null[]>([]);
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

  const fetchDocuments = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      // documents
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
    fetchDocuments();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && !documents.length && <None text="No documents yet." />}
      {!loading && documents.length > 0 && (
        <Table data={documents} headers={headers} />
      )}
    </div>
  );
}
