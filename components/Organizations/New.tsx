import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Organization } from '@/types';
import { useAuthContext } from 'app/(private)/context';
import { useState } from 'react';

type Props = {
  onCreate: () => void;
  onClose?: () => void;
};

export default function NewOrganization({ onCreate, onClose }: Props) {
  const { supabase } = useSupabase();
  const { notify, user } = useAuthContext();
  const [newOrganization, setNewOrganization] = useState<Organization>({
    name: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  const createNew = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('organizations').insert({
        ...newOrganization
      });

      setNewOrganization({});

      if (error) {
        notify(`Sorry, could not create new organization.`, false);
        return;
      }
      notify('Successfully created !', true);
      onCreate();
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new organization.`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-4" style={{ minWidth: 300 }}>
      <div className="mb-4">
        <input
          type="text"
          value={newOrganization?.name || ''}
          placeholder={'New organization name...'}
          disabled={loading}
          className={`${loading ? 'disabled' : ''} w-full`}
          onChange={(e: any) =>
            setNewOrganization((prevData: any) => ({
              ...prevData,
              name: e.target.value
            }))
          }
        />
      </div>
      <div className="flex col-span-12 gap-2 md:col-span-2">
        <Button
          loading={loading}
          disabled={loading}
          label={'Create'}
          onClick={createNew}
        />
        {onClose && (
          <Button
            color="info"
            loading={loading}
            disabled={loading}
            label={'Cancel'}
            onClick={() => {
              if (onClose) onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}
