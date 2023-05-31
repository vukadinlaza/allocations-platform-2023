import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { deal_master_series } from '@/types/values';
import { useState } from 'react';
import FormBuilder from '../FormBuilder';

type Props = {
  onCreate: () => void;
  organizationId: string | undefined;
};

export default function NewMasterSeries({ onCreate, organizationId }: Props) {
  const { supabase } = useSupabase();
  const { user, notify } = useAuthContext();
  const [newMasterSeries, setNewMasterSeries] = useState<any>({
    name: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  const model: Field[] = [
    {
      label: 'Master series',
      key: 'master_series',
      type: 'select',
      show: true,
      items: deal_master_series
    },
    {
      label: 'Series name',
      key: 'name',
      type: 'string',
      show: true
    }
  ];

  const createNew = async () => {
    if (!user && !organizationId) return;
    try {
      setLoading(true);

      const { data, error } = await supabase.from('master_series').insert({
        ...newMasterSeries,
        user_email: user.email,
        organization_id: organizationId
      });

      setNewMasterSeries({});

      if (error) {
        notify(`Sorry, could not create new master series.`, false);
        return;
      }
      notify('Successfully created!', true);
      onCreate();
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new master series.`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="mb-4">
        <FormBuilder
          data={newMasterSeries}
          model={model}
          emit={true}
          onSubmit={(v: any) => {
            setNewMasterSeries((prev: any) => ({ ...prev, ...v }));
          }}
        />
      </div>
      <Button
        loading={loading}
        disabled={loading}
        label={'Create'}
        onClick={createNew}
      />
    </div>
  );
}
