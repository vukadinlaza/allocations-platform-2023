import { useAuthContext } from '@/app/context';
import supabase from '@/lib/supabase';
import { Organization } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Button from '../Button';
import ChipStatus from '../ChipStatus';
import DangerZone from '../DangerZone';
import FormBuilder, { Field } from '../FormBuilder';
import MissingData from '../MissingData';

export default function OrganizationForm({
  organization
}: {
  organization: Organization;
}) {
  const [data, setData] = useState<Organization | null>(null);
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

  useEffect(() => {
    if (organization) {
      setData(organization);
    }
  }, []);
  return (
    <>
      {!data && <MissingData />}
      {data && (
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
      )}
    </>
  );
}
