import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Organization } from '@/types';
import { useAuthContext } from 'app/(private)/context';
import { useState } from 'react';

type Props = {
  onCreate: () => void;
  onClose: () => void;
};

export default function NewOrganization({ onCreate, onClose }: Props) {
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
    <div className="w-full grid-cols-12 gap-4 my-4 md:grid">
      <div className="col-span-12 mb-4 md:col-span-10 md:mb-0">
        <input
          type="text"
          value={newOrganization?.name || ''}
          placeholder={'Enter your new organization name here...'}
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
        <Button
          color="info"
          loading={loading}
          disabled={loading}
          label={'Cancel'}
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
}
