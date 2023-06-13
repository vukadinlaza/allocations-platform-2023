import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { useState } from 'react';

export default function NewTrust({ onUpdate }: { onUpdate: () => void }) {
  const [newCompany, setNewCompany] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const saveNewEntity = async () => {
    if (!newCompany.name) return alert('Please enter a name');
    try {
      setLoading(true);
      const { data } = await supabase
        .from('identities')
        .insert({ ...newCompany, type: 'Entity', entity_type: 'Trust' })
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
    },
    {
      label: 'Principal place of business (full address)',
      key: 'address',
      type: 'string',
      placeholder: '500 Madison Ave., New York',
      show: true
    },
    {
      label: 'Phone number',
      key: 'phone',
      type: 'string',
      show: true
    },
    {
      label: 'Tax ID',
      key: 'tax_id',
      type: 'string',
      placeholder: 'Enter your tax ID',
      show: true
    }
  ];

  return (
    <div className="new--trust">
      <FormBuilder
        emit={true}
        model={model}
        onSubmit={(v) => setNewCompany(v)}
      />
      <div className="mt-4">
        <Button
          loading={loading}
          label="Save new entity"
          onClick={() => saveNewEntity()}
        />
      </div>
    </div>
  );
}
