import LoadingList from '@/components/Loading/List';
import { useSupabase } from '@/lib/supabase-provider';
import { Identity } from '@/types';
import { useEffect, useState } from 'react';
import IdentityItem from './Item';

export const IdentityList = ({
  type,
  selectedId,
  onSelect,
  details = false
}: {
  type?: 'Individual' | 'Entity';
  selectedId?: string;
  details?: boolean;
  onSelect: (identityId: string) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const { supabase } = useSupabase();

  const getIdentities = async () => {
    try {
      setLoading(true);
      let query = supabase.from('identities').select('*');
      if (type) {
        query.eq('type', type);
      }
      const { data } = await query;
      if (data) {
        setIdentities(data as Identity[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getIdentities();
  }, []);

  return (
    <>
      {loading && <LoadingList />}
      {!loading && (
        <div>
          {!details && (
            <div className="mb-2">
              <label>Please select one signer</label>
            </div>
          )}
          <div className="grid gap-2">
            {identities.map((identity: Identity, index: number) => (
              <IdentityItem
                selectedId={selectedId}
                key={index}
                details={details}
                identity={identity}
                onChange={(id: string) => {
                  onSelect(id);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
