import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { useState } from 'react';

import { deal_banking_providers } from '@/types/values';

export default function SelectBank({
  onSave,
  onChange,
  loading
}: {
  loading: boolean;
  onSave: () => any;
  onChange: (o: any | undefined) => any;
}) {
  const [bankAccounts, setBankAccounts] = useState<any>([]);
  const [selectedBankAccount, setSelectedBankAccount] = useState<any>(null);
  const [_loading, setLoading] = useState<boolean>(false);

  const {} = useSupabase();

  // key banking_provider

  // const getBankAccounts = async () => {
  //   try {
  //     setLoading(true);
  //     // let { data, error } = await fetchOrganizations();

  //     // if (data) {
  //     //   setOrganizations(data);
  //     // }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getBankAccounts();
  // }, []);

  // useEffect(() => {
  //   const found = bankAccounts?.find(
  //     (b: any) => b.name === selectedBankAccount
  //   );
  //   onChange(found);
  // }, [selectedBankAccount]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Create a bank account</h2>
        <p>Choose a banking provider for your deal.</p>
      </header>
      {_loading && <div className="w-full h-12 loading" />}
      {!_loading && (
        <Select
          items={deal_banking_providers}
          onChange={(str: string) => {
            selectedBankAccount(str);
          }}
          displayLabel={(x) => x}
        />
      )}
      <div className="flex items-center gap-4 mt-4">
        <Button
          loading={loading || _loading}
          onClick={() => onSave()}
          label="Save"
        />
      </div>
    </div>
  );
}
