import { countries } from '@/app/config';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import FormBuilder from '@/components/FormBuilder';
import { IdentityList } from '@/components/Identity/List';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import * as Sentry from '@sentry/nextjs';
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
  const [selectedIndividualIdentity, setSelectedIndividualIdentity] = useState<
    string | undefined
  >();

  const model: Field[] = [
    {
      label: 'Entity name',
      key: 'legal_name',
      type: 'string',
      placeholder: 'Your entity name',
      show: true
    },
    {
      label: 'Date of formation',
      key: 'date_of_entity_formation',
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
      key: 'region',
      type: 'string',
      placeholder: 'Enter a state',
      show: true
    },
    {
      label: 'Principal place of business (Address)',
      key: 'address_line_1',
      type: 'string',
      placeholder: '500 Madison Ave',
      show: true
    },
    {
      label: 'Address Line 2',
      key: 'address_line_2',
      type: 'string',
      placeholder: 'Suite C',
      show: true
    },
    {
      label: 'Zip / Postal Code',
      key: 'postal_code',
      type: 'string',
      placeholder: '888888',
      show: true
    },
    {
      label: 'Phone number',
      key: 'phone_number',
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
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Not Logged in');
    }
    if (!newCompany.legal_name) return alert('Please enter a name');
    if (!newCompany.country)
      setNewCompany((prev: any) => ({ ...prev, country: 'United States' }));
    try {
      setLoading(true);
      const { data } = await supabase
        .from('identities')
        .insert({
          ...newCompany,
          type: 'Entity',
          entity_type: type === 'Partnership' ? 'LP' : type,
          user_email: session.user.email
        })
        .select()
        .single();
      if (!data) {
        throw new Error('Failed to create identity');
      }
      await supabase
        .from('identities')
        .update({
          parent_identity_id: data.id
        })
        .eq('id', selectedIndividualIdentity);

      if (data) {
        onUpdate();
      }
    } catch (error) {
      Sentry.captureException(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!newCompany) return;
    const modelKeys = model
      .filter((model) => !['address_line_2'].includes(model.key as string))
      .map((model) => model.key);
    const newCompanyKeys = Object.keys(newCompany);

    const isAllKeysPresent = modelKeys.every((key) => {
      if (key) return newCompanyKeys.includes(key);
    });

    const hasAllValues = modelKeys.every((key) => {
      if (key) return newCompany[key] && newCompany[key].length > 1;
    });

    if (isAllKeysPresent && hasAllValues && agree && selectedIndividualIdentity)
      return setDisabled(false);

    setDisabled(true);
  }, [agree, newCompany]);

  return (
    <div className="new--company">
      <div>
        <Checkbox
          selected={agree}
          onChange={() => setAgree(!agree)}
          label={`I am an authorized signatory for this entity.`}
        />
      </div>
      {agree && (
        <>
          <div>
            <div className={'mb-2'}>
              <h2 className="mb-2">
                Please choose your designated signatory identity
              </h2>
            </div>
            <IdentityList
              type={'Individual'}
              selectedId={selectedIndividualIdentity}
              onSelect={setSelectedIndividualIdentity}
            />
          </div>
          {selectedIndividualIdentity && (
            <>
              <FormBuilder
                emit={true}
                model={model}
                onSubmit={(v) =>
                  setNewCompany((prev: any) => ({ ...prev, ...v }))
                }
              />
              <ul className="my-6 text-xs text-gray-600 list-disc list-inside">
                <li className="mb-2">
                  The first time you invest with the multiple-owner entity, you
                  will be asked to submit additional verifying documents to
                  comply with the U.S. financial laws.
                </li>
                <li className="mb-2">
                  The minimum investment for entities with multiple owners is
                  $5,000.
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
            </>
          )}
        </>
      )}
    </div>
  );
}
