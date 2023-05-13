import { useAuthContext } from '@/app/context';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ChipStatus from '../ChipStatus';
import DangerZone from '../DangerZone';
import FormBuilder from '../FormBuilder';
import MissingData from '../MissingData';

type Props = {
  data: any;
  model?: Field[] | any;
  table: string;
  setOpen: any;
  type?: string;
};

export default function FormBasic({
  data,
  model,
  table,
  type,
  setOpen
}: Props) {
  const [existing, setExisting] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [supabaseTable, setSupabaseTable] = useState<any>(null);

  const { supabase } = useSupabase();
  const { notify, user } = useAuthContext();

  const upsertElement = async (form: any) => {
    if (!form) return;
    try {
      setLoading(true);
      const { data: response, error } = await supabase
        .from(supabaseTable)
        .upsert(form, { onConflict: 'id' });

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

  const deleteElement = async (form: any) => {
    if (!form || !form.id) return;
    try {
      setLoading(true);
      const { data: response, error } = await supabase
        .from(supabaseTable)
        .delete()
        .eq('id', form.id);

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
    setExisting(data);
  }, [data]);

  useEffect(() => {
    // pass over joined tables
    if (type && type === 'organization' && table === 'organizations_roles')
      return setSupabaseTable('organizations');
    setSupabaseTable(table);
  }, [table]);

  return (
    <>
      {!existing && <MissingData />}
      {existing && (
        <div className="form">
          <header>
            <h1>{existing.name}</h1>
            {existing.created_at && (
              <p className="mb-4">
                Creation date: {dayjs(existing.created_at).format('MM/DD/YYYY')}
              </p>
            )}
            {existing.status && <ChipStatus status={existing.status} />}
          </header>
          <main className="mb-6">
            <h2 className="mb-4">Manage</h2>
            <FormBuilder
              loading={loading}
              model={model}
              data={existing}
              onSubmit={(form: any) => {
                upsertElement(form);
                setExisting(form);
              }}
              buttonLabel={'Save'}
            />
          </main>
          {existing.name && (
            <DangerZone toCheck={existing.name} onClick={() => {}} />
          )}
        </div>
      )}
    </>
  );
}
