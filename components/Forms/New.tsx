import { useAuthContext } from '@/app/context';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import CloseIcon from '@mui/icons-material/Close';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
  element: string;
  model?: Field[] | any;
  table: string;
  setOpenModal: any;
};

export default function FormsNew({
  element,
  model,
  table,
  setOpenModal
}: Props) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [newElement, setNewElement] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createNew = async (form: any) => {
    if (!form && !table && !newElement) return;
    try {
      setLoading(true);
      const { data, error } = await supabase.from(table).insert(form);

      if (error) {
        notify(`Sorry, could not create new ${element}.`, false);
        return;
      }
      notify('Successfully created !', true);
      setNewElement(null);
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new ${element}.`, false);
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (model) {
      const initialElement: any = {};
      model.forEach((field: Field) => {
        initialElement[field.key] = field.value ?? undefined;
      });
      setNewElement(initialElement);
    }
  }, [model]);

  return (
    <Card className="mb-0 card--popup" variant="outlined">
      <header>
        {table && <h2>Create a new {element}</h2>}
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
          onSubmit={(form: any) => createNew(form)}
        />
      </main>
    </Card>
  );
}
