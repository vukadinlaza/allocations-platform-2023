import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { useState } from 'react';

export default function NewIRA({ onUpdate }: { onUpdate: () => void }) {
  const [newCompany, setNewCompany] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const saveNewEntity = async () => {
    if (!newCompany.name) return alert('Please enter a name');
    try {
      setLoading(true);
      const { data } = await supabase
        .from('users_investment_entities')
        .insert({ ...newCompany, type: 'IRA' })
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
      label: 'Full name of IRA',
      key: 'name',
      type: 'string',
      placeholder: 'Your entity name',
      show: true
    },
    {
      label: 'Address of custodian or trustee',
      key: 'address',
      type: 'string',
      placeholder: '500 Madison Ave., New York',
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
    <div className="new--ira">
      <p className="mb-4 text-xs text-gray-600">
        Please note: you will need to fund your investment from Self Directed
        IRA. We recommend making sure that your IRA provider supports
        alternative investments first.
      </p>
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
