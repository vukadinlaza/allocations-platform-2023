import { form_models } from '@/app/config';
import { useAuthContext } from '@/app/context';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

type Props = {
  type?: string;
  onCreate: () => void;
};

export default function FormsNew({ type, onCreate }: Props) {
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
      const { data, error } = await supabase.from(table).insert(form);

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

  // useEffect(() => {
  //   if (formModel) {
  //     let initialElement: any = {};
  //     formModel.forEach((field: Field) => {
  //       initialElement[formModel.key] = field.value ?? undefined;
  //     });
  //     if (type) initialElement = { ...initialElement, type };
  //     setNewElement(initialElement);
  //   }
  // }, [formModel]);

  useEffect(() => {
    if (!type) return;
    // @ts-ignore
    if (form_models[type]) setFormModel(form_models[type]);
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
