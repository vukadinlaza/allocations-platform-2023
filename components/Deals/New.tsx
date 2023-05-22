import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useState } from 'react';

type Props = {
  type?: string;
  onCreate: () => void;
};

export default function NewDeal({ onCreate, type = 'spv' }: Props) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [newDeal, setNewDeal] = useState<Deal>({ type });
  const [loading, setLoading] = useState<boolean>(false);

  const createNew = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .insert({
          ...newDeal,
          type
        })
        .select()
        .single();

      setNewDeal({ type });

      if (error) {
        notify(`Sorry, could not create new deal.`, false);
        return;
      }
      notify('Successfully created !', true);
      onCreate();
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new deal.`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 w-96">
        <p className="mb-2">Enter your deal name:</p>
        <input
          type="text"
          placeholder={'Your deal name'}
          disabled={loading}
          className={`${loading ? 'disabled' : ''}`}
          value={newDeal.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewDeal((prevData: any) => ({
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
