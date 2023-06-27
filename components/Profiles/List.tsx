import LoadingList from '@/components/Loading/List';
import ModalButton from '@/components/Modal/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Identity } from '@/types';
import { useEffect, useState } from 'react';
import Button from '../Button';
import None from '../None';
import ProfileItem, { checkStatus } from './Item';
import NewProfile from './New';

export default function ProfileList({
  selectedId,
  onSelect,
  details = false
}: {
  type?: any;
  selectedId?: string | null;
  details?: boolean;
  onSelect?: (identityId: string) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const [identities, setIdentities] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const getIdentities = async () => {
    setIdentities([]);
    try {
      setLoading(true);
      const { data } = await supabase.from('identities').select('*');
      if (data) {
        if (onSelect) {
          setIdentities(
            data.filter((identity) => checkStatus(identity) === 'success')
          );
        } else {
          setIdentities(data);
        }
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
        <None
          text="No investor profile yet. Create one?"
          content={
            <>
              <ModalButton
                isOpen={modalOpen}
                onChange={(v) => setModalOpen(v)}
                title="Create a new investor profile"
                content={
                  <NewProfile
                    onCreate={() => {
                      setModalOpen(false);
                    }}
                  />
                }
              />
            </>
          }
        />
      )}
      {!loading && identities.length > 0 && (
        <div>
          {onSelect && (
            <div className="mb-2">
              <label>Please select one signer</label>
            </div>
          )}
          <div className="grid gap-2">
            {identities
              .slice(0, limit)
              .map((identity: Identity, index: number) => (
                <ProfileItem
                  key={index}
                  select={onSelect}
                  details={details}
                  selectedId={selectedId}
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
