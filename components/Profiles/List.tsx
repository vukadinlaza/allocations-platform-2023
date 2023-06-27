import LoadingList from '@/components/Loading/List';
import { useSupabase } from '@/lib/supabase-provider';
import { Identity } from '@/types';
import { useEffect, useState } from 'react';
import Button from '../Button';
import None from '../None';
import ProfileItem from './Item';

export default function ProfileList({
  selectedId,
  onSelect,
  details = false,
}: {
  type?: any;
  selectedId?: string;
  details?: boolean;
  onSelect?: (identityId: string) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const [identities, setIdentities] = useState<Identity[]>([]);
  const { supabase } = useSupabase();

  const getIdentities = async () => {
    setIdentities([]);
    try {
      setLoading(true);
      const { data } = await supabase.from('identities').select('*');;
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
    getIdentities();
    const identitiesSubscription = supabase
      .channel('identities_subscribers')
      .on(
        // @ts-ignore
        'postgres_changes',
        {
          event: `*`,
          schema: 'public',
          table: 'identities'
        },
        async (payload: any) => {
          await getIdentities();
        }
      )
      .subscribe();
  }, []);

  return (
    <>
      {loading && <LoadingList />}
      {!loading && identities.length === 0 && (
        <None text="No investor profile yet." />
      )}
      {!loading && identities.length > 0 && (
        <div>
          {!details && (
            <div className="mb-2">
              <label>Please select one signer</label>
            </div>
          )}
          <div className="grid gap-2">
            {identities
              .slice(0, limit)
              .map((identity: Identity, index: number) => (
                <ProfileItem
                  selectedId={selectedId}
                  key={index}
                  details={details}
                  identity={identity}
                  onChange={(id: string) => {
                    if (onSelect) onSelect(id);
                  }}
                  editable={true}
                />
              ))}
            {identities.length > 5 && (
              <div>
                <Button
                  color="info"
                  small={true}
                  onClick={() => setLimit(limit + 5)}
                  label={'Load more'}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
