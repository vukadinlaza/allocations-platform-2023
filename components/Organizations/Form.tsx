import { useAuthContext } from '@/app/context';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { Organization } from '@/types/organizations';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ChipStatus from '../ChipStatus';
import DangerZone from '../DangerZone';
import MissingData from '../MissingData';

export default function OrganizationForm({
  organization
}: {
  organization: Organization;
}) {
  const { supabase } = useSupabase();
  const [data, setData] = useState<Organization | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { notify, user } = useAuthContext();

  const model: Field[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      show: true,
      disabled: false
    },
    {
      key: 'id',
      label: 'ID',
      type: 'string',
      show: user.is_super_admin,
      disabled: true
    },
    {
      key: 'mongo_id',
      label: 'Mongo ID',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      show: user.is_super_admin,
      disabled: false,
      items: ['Processing', 'Complete']
    },
    {
      key: 'slug',
      label: 'Slug',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    }
  ];

  const saveOrganization = async (form: any) => {
    if (!form) return;
    try {
      setLoading(true);
      const { data: response, error } = await supabase
        .from('organizations')
        .upsert(data as Organization, { onConflict: 'id' });

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
    if (!data || !data.id) return;
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
            <h2 className="mb-4">Informations</h2>
            {/* ici il faut adapter le form builder */}
            <FormBuilder
              loading={loading}
              disabled={loading}
              model={model}
              data={data}
              onSubmit={(form: any) => saveOrganization(form)}
              buttonLabel={'Save'}
            />
          </main>
          <DangerZone toCheck={data.name} onClick={deleteOrganization} />
        </div>
      )}
    </>
  );
}
