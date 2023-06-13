import { useSupabase } from '@/lib/supabase-provider';
import { Identity } from '@/types';
import { useEffect, useState } from 'react';
import IdentityItem from './Item';

export const IdentityList = ({
  type,
  selectedId,
  onSelect
}: {
  type?: 'Individual' | 'Entity';
  selectedId?: string;
  onSelect: (identityId: string) => void;
}) => {
  const [identities, setIdentities] = useState<Identity[]>([]);
  const { supabase } = useSupabase();

  const getIdentities = async () => {
    let query = supabase.from('identities').select('*');
    if (type) {
      query.eq('type', type);
    }
    const { data } = await query;
    if (data) {
      setIdentities(data as Identity[]);
    }
  };

  useEffect(() => {
    void getIdentities();
  }, []);

  return (
    <div>
      <div className="mb-2">
        <label>Please select one signer</label>
      </div>
      {identities.map((identity: Identity, index: number) => (
        <IdentityItem
          selectedId={selectedId}
          key={index}
          identity={identity}
          onChange={(id: string) => {
            onSelect(id);
          }}
        />
      ))}
    </div>
  );
};
