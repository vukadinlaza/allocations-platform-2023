import { useAuthContext } from '@/app/context';
import supabase from '@/lib/supabase';
import { Organization } from '@/types';
import dayjs from 'dayjs';
import { useState } from 'react';
import Button from '../Button';
import ChipStatus from '../ChipStatus';
import DangerZone from '../DangerZone';
import FormBuilder, { Field } from '../FormBuilder';

export default function OrganizationForm() {
  const [data, setData] = useState<Organization>({
    id: '916ab295-c4e5-48ea-b9d0-42ab089be7dc',
    created_at: '2023-05-09T08:29:34.89119+00:00',
    updated_at: '2023-05-09T08:29:34.89119+00:00',
    status: 'Processing',
    mongo_id: null,
    name: 'Organizations new',
    slug: null,
    approved: null,
    high_volume_partner: false,
    legal_name: null,
    mou_signed: false,
    phase: null
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useAuthContext();

  const model: Field[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'string'
    }
  ];

  const saveOrganization = async () => {
    try {
      setLoading(true);
      const { data: response, error } = await supabase
        .from('organizations')
        .upsert(data, { onConflict: 'id' });

      if (error) {
        notify('Sorry, update failed.', false);
        return;
      }
      notify('Successfully updated.', true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteOrganization = async () => {
    try {
      setLoading(true);
      const { data: response, error } = await supabase
        .from('organizations')
        .delete()
        .eq('id', data.id);

      if (error) {
        notify('Sorry, deletion failed.', false);
        return;
      }
      notify('Successfully deleted.', true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="form">
      <header>
        <h1>{data.name}</h1>
        <p className="mb-4">
          Creation date: {dayjs(data.created_at).format('MM/DD/YYYY')}
        </p>
        <ChipStatus status={data.status} />
      </header>
      <main className="mb-6">
        <h2>Informations</h2>
        <p>{data.name}</p>
        <FormBuilder model={model} data={data} onChange={setData} />
        <div>
          <Button
            loading={loading}
            disabled={loading}
            label="Save"
            onClick={saveOrganization}
          />
        </div>
      </main>
      <DangerZone toCheck={data.name} onClick={deleteOrganization} />
    </div>
  );
}
