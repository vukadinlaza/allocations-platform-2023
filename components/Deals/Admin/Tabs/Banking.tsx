import BankAccountItem from '@/components/Banking/Item';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Table from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';

export default function DealAdminBanking({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [bankAccount, setBankAccount] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  let headers = [
    {
      label: 'Date',
      key: 'created_at',
      type: 'date',
      show: true
    },
    {
      label: 'Transaction description',
      key: 'description',
      type: 'string',
      show: true
    },
    {
      label: 'Amount',
      key: 'amount',
      type: 'price',
      show: true
    },
    {
      label: 'Status',
      key: 'status',
      type: 'chip',
      show: true
    }
  ];

  const fetchBanking = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data: bank_account, error } = await supabase
        .from('bank_accounts')
        .select('*, transactions(*)')
        .eq('deal_id', deal.id)
        .single();

      if (bank_account) {
        setBankAccount(bank_account);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBanking();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && !bankAccount && <None text="No bank account yet." />}
      {!loading && bankAccount && (
        <div>
          <header className="mb-8">
            <h1>Banking & transactions</h1>
            <BankAccountItem bank_account={bankAccount} />
          </header>
          {!bankAccount.transactions &&
            bankAccount.transactions.length === 0 && (
              <None text="No transactions yet." />
            )}
          {bankAccount.transactions.length > 0 && (
            <Table data={bankAccount.transactions} headers={headers} />
          )}
        </div>
      )}
    </div>
  );
}
