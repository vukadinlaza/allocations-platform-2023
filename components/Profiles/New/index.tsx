'use client';
import Alert from '@/components/Alert';
import LoadingList from '@/components/Loading/List';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { investment_identity_types } from '@/types/values';
import { useEffect, useState } from 'react';
import NewEntity from './Entity';
import NewIndividual from './Individual';

export default function NewProfile({ onCreate }: { onCreate?: () => void }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>(investment_identity_types[0]);
  const [hasOneIndividual, setHasOneIndividual] = useState<any>(false);
  const { supabase } = useSupabase();

  const individual = 'Myself / Individual';

  const getIdentities = async () => {
    try {
      setLoading(true);

      const { data } = await supabase.from('identities').select('*');

      if (data) {
        const hasOne = data.some((x: any) => x.entity_type === individual);
        setHasOneIndividual(!hasOne);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdentities();
  }, []);

  return (
    <div style={{ minWidth: 350 }}>
      {loading && <LoadingList />}
      {!loading && (
        <div>
          {hasOneIndividual && (
            <Alert
              color="bg-sky-50 text-sky-500 mb-4 font-bold text-sm"
              content={
                <span>You need at least one individual profile to invest.</span>
              }
            />
          )}
          <label>Select an entity type*</label>
          <Select
            items={
              hasOneIndividual
                ? [investment_identity_types[0]]
                : investment_identity_types
            }
            selected={type}
            onChange={(e: string) => {
              setType(e);
            }}
          ></Select>
          {type === investment_identity_types[0] && (
            <NewIndividual
              onCreate={() => {
                if (onCreate) {
                  onCreate();
                }
              }}
            />
          )}
          {type !== investment_identity_types[0] && (
            <NewEntity
              entity_type={type}
              onCreate={() => {
                if (onCreate) {
                  onCreate();
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
