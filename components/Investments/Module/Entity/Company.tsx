import { countries } from '@/app/config';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { useEffect, useState } from 'react';

export default function NewCompany({
  type,
  onUpdate
}: {
  type: string;
  onUpdate: () => void;
}) {
  const [newCompany, setNewCompany] = useState<any>({
    type
  });
  const [agree, setAgree] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const model: Field[] = [
    {
      label: 'Entity name',
      key: 'name',
      type: 'string',
      placeholder: 'Your entity name',
      show: true
    },
    {
      label: 'Date of formation',
      key: 'created_date',
      type: 'date',
      show: true
    },
    {
      label: 'Country of formation',
      key: 'country',
      type: 'select',
      placeholder: 'United States',
      show: true,
      items: countries
    },
    {
      label: 'State of formation',
      key: 'state',
      type: 'string',
      placeholder: 'Enter a state',
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

  const { supabase } = useSupabase();

  const saveNewEntity = async () => {
    if (!newCompany.name) return alert('Please enter a name');
    if (!newCompany.country)
      setNewCompany((prev: any) => ({ ...prev, country: 'United States' }));
    try {
      setLoading(true);
      const { data } = await supabase
        .from('users_investment_entities')
        .insert({ ...newCompany, type })
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

  useEffect(() => {
    console.log(newCompany);
    if (!newCompany) return;
    const modelKeys = model.map((model) => model.key);
    const newCompanyKeys = Object.keys(newCompany);

    const isAllKeysPresent = modelKeys.every((key) =>
      newCompanyKeys.includes(key)
    );

    const hasAllValues = modelKeys.every(
      (key) => newCompany[key] && newCompany[key].length > 1
    );

    if (isAllKeysPresent && hasAllValues && agree) return setDisabled(false);

    setDisabled(true);
  }, [agree, newCompany]);

  return (
    <div className="newCompany">
      <FormBuilder
        emit={true}
        model={model}
        onSubmit={(v) => setNewCompany((prev: any) => ({ ...prev, ...v }))}
      />
      <div>
        <Checkbox
          selected={agree}
          onChange={() => setAgree(!agree)}
          label={`I, X, am an authorized signatory for this entity.`}
        />
      </div>
      <ul className="my-6 text-xs text-gray-600 list-disc list-inside">
        <li className="mb-2">
          The first time you invest with the multiple-owner entity, you will be
          asked to submit additional verifying documents to comply with the U.S.
          financial laws.
        </li>
        <li className="mb-2">
          The minimum investment for entities with multiple owners is $5,000.
        </li>
      </ul>
      <div>
        <Button
          disabled={disabled}
          loading={loading}
          label="Save investment entity"
          onClick={saveNewEntity}
        />
      </div>
    </div>
  );
}
