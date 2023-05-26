import { Identity } from '@/types';
import Avatar from '@mui/material/Avatar';
import { getFirstLetter } from '@/lib/utils';
import Checkbox from '@/components/Checkbox';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/lib/supabase-provider';

export const IdentityList = ({ type, selectedId, onSelect }: {
  type?: 'Individual' | 'Entity',
  selectedId?: string,
  onSelect: (identityId: string) => void
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
  return (<>
    {
      identities.map((identity: Identity, index: number) => (
        <div
          key={index}
          className='flex items-center justify-between p-2 mb-4 border rounded cursor-pointer hover:bg-gray-50'
          onClick={() => onSelect(identity.id)}
        >
          <Avatar
            className='mr-2 cursor-pointer'
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#3db278',
              textTransform: 'capitalize'
            }}
          >
            {getFirstLetter(identity.legal_name)}
          </Avatar>
          <div className='flex flex-col grow'>
            {identity.legal_name && <span className='mb-0'>{identity.legal_name}</span>}
            {identity.type === 'Individual' && (
              <span className='text-xs text-gray-600'>
                        A {identity.country} {identity.type}
                      </span>
            )}
            {identity.entity_type && (
              <span className='text-xs text-gray-600'>
                        A {identity.country} {identity.entity_type} Entity
                      </span>
            )}
          </div>
          <Checkbox selected={selectedId === identity.id} />
        </div>
      ))
    }
  </>);
};
