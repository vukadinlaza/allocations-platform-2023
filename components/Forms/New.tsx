import { form_models } from '@/app/config';
import { useAuthContext } from '@/app/context';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

type Props = {
  target?: string;
  queryType?: string;
  onCreate: () => void;
};

export default function NewForm({ target, onCreate, queryType }: Props) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [newElement, setNewElement] = useState<any>(null);
  const [formModel, setFormModel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createNew = async (form: any) => {
    const { element, table } = formModel;
    if (!form && !table && !newElement) return;
    try {
      setLoading(true);
      let newForm = form;

      if (queryType) {
        newForm = { ...form, type: queryType };
      }

      const { data, error } = await supabase.from(table).insert(newForm);

      setNewElement(null);

      if (error) {
        notify(`Sorry, could not create new ${element}.`, false);
        return;
      }
      notify('Successfully created !', true);
      onCreate();
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new ${element}.`, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!target) return;
    // @ts-ignore
    if (form_models[target]) setFormModel(form_models[target]);
  }, []);

  return (
    <FormBuilder
      data={newElement}
      model={formModel?.model}
      loading={loading}
      buttonLabel={'Create'}
      onSubmit={(form: any) => createNew(form)}
    />
  );
}
