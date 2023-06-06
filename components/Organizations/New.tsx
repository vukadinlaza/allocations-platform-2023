import { useAuthContext } from 'app/(private)/context';
import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Organization } from '@/types';
import { useState } from 'react';

type Props = {
  onCreate: () => void;
};

export default function NewOrganization({ onCreate }: Props) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
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
    <div>
      <div className="mb-6 w-96">
        <p className="mb-2">Enter your organization name:</p>
        <input
          type="text"
          value={newOrganization?.name || ''}
          placeholder={'Your organization name'}
          disabled={loading}
          className={`${loading ? 'disabled' : ''}`}
          onChange={(e: any) =>
            setNewOrganization((prevData: any) => ({
              ...prevData,
              name: e.target.value
            }))
          }
        />
      </div>
      <Button
        loading={loading}
        disabled={loading}
        label={'Create'}
        onClick={createNew}
      />
    </div>
  );
}
