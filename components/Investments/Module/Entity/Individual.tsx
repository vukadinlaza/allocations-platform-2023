import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { useState } from 'react';

export default function NewIndividual({ onUpdate }: { onUpdate: () => void }) {
  const [newCompany, setNewCompany] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const saveNewEntity = async () => {
    if (!newCompany.name) return alert('Please enter a name');
    try {
      setLoading(true);
      const { data } = await supabase
        .from('users_investment_entities')
        .insert({ name: newCompany.name, type: 'Individual' })
        .select();

      if (data) {
        onUpdate();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const model: Field[] = [
    {
      label: 'Entity name',
      key: 'name',
      type: 'string',
      placeholder: 'Your entity name',
      show: true
    }
  ];

  return (
    <div className="newCompany">
      <FormBuilder
        emit={true}
        model={model}
        onSubmit={(v) => setNewCompany(v)}
      />
      <div className="mt-4">
        <Button
          loading={loading}
          label="Save investment entity"
          onClick={() => saveNewEntity()}
        />
      </div>
    </div>
  );
}
