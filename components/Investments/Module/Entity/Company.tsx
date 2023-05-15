import FormBuilder from '@/components/FormBuilder';
import { Field } from '@/types';
import { useState } from 'react';

export default function NewCompany({ type }: { type: string }) {
  const [newCompany, setNewCompany] = useState<any>({
    type
  });
  const model: Field[] = [
    {
      label: 'Date of formation',
      key: 'created_date',
      type: 'date',
      show: true
    },
    {
      label: 'Country of formation',
      key: 'country',
      type: 'string',
      show: true
    },
    {
      label: 'State of formation',
      key: 'state',
      type: 'string',
      show: true
    },
    {
      label: 'Principal place of business (full address)',
      key: 'address',
      type: 'string',
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
      show: true
    }
  ];
  return (
    <div className="mb-8 newCompany">
      <FormBuilder model={model} onSubmit={(v) => setNewCompany(v)} />
    </div>
  );
}
