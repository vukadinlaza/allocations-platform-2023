import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import { Card } from '@mui/material';
import { useState } from 'react';

export default function FormsNew({
  model,
  table,
  setOpenModal
}: {
  model?: Field | any;
  table: string;
  setOpenModal: any;
}) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [newElement, setNewElement] = useState<any>({
    name: undefined
  });
  const [loading, setLoading] = useState<boolean>(false);

  const singular = (str: string) => {
    if (str && str.endsWith('s')) {
      return str.slice(0, -1);
    }
  };

  const createNew = async () => {
    if (!table || !newElement) return;
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).insert(newElement);

      if (error) {
        notify(`Sorry, could not create new ${singular(table)}.`, false);
        return;
      }
      notify('Successfully created !', true);
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new ${singular(table)}.`, false);
    } finally {
      setNewElement(null);
      setLoading(false);
      setOpenModal(false);
    }
  };
  return (
    <Card className="mb-0 card--popup" variant="outlined">
      <header>
        {table && <h2>Create a new {singular(table)}</h2>}
        <CloseIcon
          fontSize="inherit"
          className="text-2xl cursor-pointer text-gray"
          onClick={() => setOpenModal(false)}
        />
      </header>
      <main className="w-96">
        <FormBuilder
          data={newElement}
          model={model}
          loading={loading}
          onChange={setNewElement}
        />
        <Button
          loading={loading}
          disabled={loading}
          label={'Create'}
          onClick={createNew}
        />
      </main>
    </Card>
  );
}
