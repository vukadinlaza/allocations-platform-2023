import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { deal_types } from '@/types/values';
import { useAuthContext } from 'app/(private)/context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SelectOrganization from '../Organizations/SelectOrganization';
import Select from '../Select';

export default function NewDeal({
  onCreate,
  selectType = false,
  isMigration = false,
  type = 'spv'
}: {
  type?: string;
  selectType?: boolean;
  isMigration?: boolean;
  onCreate: () => void;
}) {
  const { supabase } = useSupabase();
  const { notify, user } = useAuthContext();
  const [newDeal, setNewDeal] = useState<Deal | any>({
    organization_id: undefined
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const createNew = async () => {
    if (!newDeal.name) return alert('Please enter a name');
    if (!newDeal.organization_id) return alert('Please enter an organization');
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .insert({
          ...newDeal,
          user_email: user.email,
          type: (newDeal.type || type).toLowerCase(),
          is_migration: isMigration
        })
        .select()
        .single();

      if (error) {
        notify(`Sorry, could not create new deal.`, false);
        return;
      }
      if (data) {
        setNewDeal({});
        onCreate();
        router.push(`/deals/${data.id}`);
        notify('Successfully created !', true);
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
        <div className="grid gap-3">
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
          {selectType && (
            <Select
              selected={newDeal.type || type}
              displayLabel={(v) => <span className="uppercase">{v}</span>}
              items={deal_types.map((type) => {
                if (type === 'spv') return type.toUpperCase();
                return `${type.charAt(0).toUpperCase() + type.slice(1)}`;
              })}
              onChange={(v) =>
                setNewDeal((prev: any) => ({
                  ...prev,
                  type: v
                }))
              }
            />
          )}
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
          <div>
            <Button
              loading={loading}
              disabled={!newDeal.name || !newDeal.organization_id}
              label={'Create'}
              onClick={createNew}
            />
          </div>
        </div>
      )}
    </>
  );
}
