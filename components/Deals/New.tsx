import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useAuthContext } from 'app/(private)/context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SelectOrganization from '../Organizations/SelectOrganization';

type Props = {
  type?: string;
  onCreate: () => void;
};

export default function NewDeal({ onCreate, type = 'spv' }: Props) {
  const { supabase } = useSupabase();
  const { notify, user } = useAuthContext();
  const [newDeal, setNewDeal] = useState<Deal | any>({
    organization_id: undefined
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const createNew = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .insert({
          ...newDeal,
          user_email: user.email,
          type,
          is_migration: false
        })
        .select()
        .single();

      if (error) {
        notify(`Sorry, could not create new deal.`, false);
        return;
      }
      if (data) {
        setNewDeal({});
        notify('Successfully created !', true);
        onCreate();
        router.push(`/deals/${data.id}`);
      }
    } catch (error) {
      notify(`Sorry, could not create new deal.`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {newDeal && (
        <div>
          <div className="mb-6">
            <input
              type="text"
              placeholder={'Your deal name'}
              disabled={loading}
              className={`${loading ? 'disabled' : ''}`}
              value={newDeal.name || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewDeal((prevData: any) => ({
                  ...prevData,
                  name: e.target.value
                }))
              }
            />
          </div>
          <SelectOrganization
            header={false}
            loading={loading}
            onChange={({ organization_id }: any) => {
              setNewDeal((prevData: any) => ({
                ...prevData,
                organization_id
              }));
            }}
          />
          <Button
            loading={loading}
            disabled={!newDeal.name || !newDeal.organization_id}
            label={'Create'}
            onClick={createNew}
          />
        </div>
      )}
    </>
  );
}
