import Image from 'next/image';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

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
  const [_loading, setLoading] = useState<boolean>(true);

  const {} = useSupabase();

  const getBankAccounts = async () => {
    try {
      setLoading(true);
      // let { data, error } = await fetchOrganizations();

      // if (data) {
      //   setOrganizations(data);
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBankAccounts();
  }, []);

  useEffect(() => {
    const found = bankAccounts?.find(
      (b: any) => b.name === selectedBankAccount
    );
    onChange(found);
  }, [selectedBankAccount]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Select a bank account</h2>
        <p>List of your current bank accounts</p>
      </header>
      {_loading && <div className="w-full h-12 loading" />}
      {!_loading && (
        <Select
          items={bankAccounts}
          onChange={(str: string) => {
            selectedBankAccount(str);
          }}
          displayLabel={(x) => x.name}
        />
      )}
      <div className="flex items-center gap-4 mt-4">
        <Button
          loading={loading || _loading}
          onClick={() => onSave()}
          label="Save"
        />
        <Button
          icon={
            <Image
              src={'/plus.svg'}
              alt="plus"
              className="opacity-50"
              width={18}
              height={18}
            />
          }
          color="info"
          loading={loading || _loading}
          onClick={() => {}}
          label="New bank account"
        />
      </div>
    </div>
  );
}
