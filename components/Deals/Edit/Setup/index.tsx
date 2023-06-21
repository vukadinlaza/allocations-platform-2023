'use client';
import Button from '@/components/Button';
import DealInformations, {
  keys
} from '@/components/Deals/Edit/Setup/Informations';
import DealMemo from '@/components/Deals/Edit/Setup/Memo';
import Step from '@/components/Step';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useAuthContext } from 'app/(private)/context';
import { useEffect, useState } from 'react';

export default function DealSetup({ deal }: { deal: Deal }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [newDeal, setNewDeal] = useState<any>({});
  const { notify } = useAuthContext();

  const { saveDeal } = useSupabase();

  const save = async () => {
    try {
      setLoading(true);
      const promises = [saveDeal({ ...newDeal, id: deal.id })];
      const [dealResponse] = await Promise.all(promises);
      const { error } = dealResponse;
      if (error) {
        notify(`Sorry, could not save deal.`, false);
        return;
      }
      notify('Deal saved.', true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let selectedKeys: { [key: string]: any } = {};

    let modifiedKeys = [...keys, 'memo'];

    for (const key of modifiedKeys) {
      if (key in deal) {
        // @ts-ignore
        selectedKeys[key] = deal[key];
      }
    }

    setNewDeal(selectedKeys);
  }, [deal]);

  return (
    <div className="grid gap-4">
      <div className="grid overflow-hidden bg-white border rounded-lg">
        <Step
          selected={newDeal.name}
          component={
            <DealInformations
              deal={newDeal}
              onSave={async () => {
                await saveDeal();
              }}
              onChange={(_deal: any) => {
                setNewDeal((prev: any) => ({ ...prev, ..._deal }));
              }}
            />
          }
        />
        <Step
          selected={newDeal.memo}
          component={
            <DealMemo
              deal={newDeal}
              onChange={(memo: any) => {
                setNewDeal((prev: any) => ({ ...prev, memo }));
              }}
            />
          }
        />
      </div>
      <div>
        <Button loading={loading} label={'Save'} onClick={save} />
      </div>
    </div>
  );
}
