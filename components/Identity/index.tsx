'useClient';
import { countries } from '@/app/(private)/config';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import FormBuilder from '@/components/FormBuilder';
import { IdentityList } from '@/components/Identity/List';
import { useSupabase } from '@/lib/supabase-provider';
import { isIdentityValid } from '@/lib/utils';
import { Field } from '@/types';
import {
  entity_tax_id_type,
  entity_type,
  investment_identity_types
} from '@/types/values';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import Alert from '../Alert';

export default function NewIdentity({
  onUpdate,
  identity
}: {
  onUpdate: () => void;
  identity?: any;
}) {
  // {
  //   entity_type: investment_identity_types[0],
  //   type: entity_type[0],
  //   kyc_status: 'queued'
  // }
  const [newCompany, setNewCompany] = useState<any>(null);
  const [agree, setAgree] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasOneIndividual, setHasOneIndividual] = useState<any>(false);
  const { user, notify } = useAuthContext();
  const { supabase, fetchIdentities } = useSupabase();

  // set parent here
  const [parentEntityId, setParentEntityId] = useState<any>(null);

  const individual = 'Myself / Individual';

  const model: Field[] = [
    {
      label: 'Type of entity *',
      key: 'entity_type',
      type: 'select',
      placeholder: 'United States',
      show: true,
      items: hasOneIndividual
        ? investment_identity_types
        : investment_identity_types.filter((x) => x === individual)
    },
    {
      label: 'Select a country of citizenship*',
      key: 'country_of_citizenship',
      type: 'select',
      placeholder: 'United States',
      show: newCompany?.entity_type === individual,
      items: countries
    },
    {
      label: 'Is this a US Domestic entity?*',
      key: 'us_domestic',
      type: 'select',
      show: newCompany?.entity_type !== individual,
      items: ['Yes', 'No']
    },
    {
      label: 'Tax ID*',
      key: 'tax_id',
      type: 'string',
      placeholder: 'Enter your tax ID — if not, enter 0',
      show: true
    },
    {
      label: 'Tax ID type*',
      key: 'tax_id_type',
      type: 'select',
      placeholder: 'SSN / EIN / ITIN / FTIN',
      show: true,
      items: entity_tax_id_type.filter((x) => {
        if (newCompany?.entity_type === individual) {
          return x !== 'EIN';
        }
        return x;
      })
    },
    {
      label:
        newCompany?.entity_type === individual
          ? 'Your full name*'
          : 'Your entity name*',
      key: 'legal_name',
      type: 'string',
      placeholder:
        newCompany?.entity_type === individual ? 'John Smith' : 'Example, LLC',
      show: true
    },
    {
      label:
        newCompany?.entity_type === individual
          ? 'Date of birth*'
          : 'Date of formation*',
      key: 'date_of_entity_formation',
      type: 'date',
      show: true
    },
    {
      label:
        newCompany?.entity_type === individual
          ? 'Address Line 1*'
          : 'Principal place of business (Address)',
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
      label: 'City*',
      key: 'city',
      type: 'string',
      placeholder: 'Miami',
      show: true
    },
    {
      label:
        newCompany?.entity_type === individual
          ? 'State / Region*'
          : 'State of formation*',
      key: 'region',
      type: 'string',
      placeholder: 'Florida',
      show: true
    },
    {
      label: 'ZIP / Postal Code*',
      key: 'postal_code',
      type: 'string',
      placeholder: '888888',
      show: true
    },
    {
      label: 'Select a country*',
      key: 'country',
      type: 'select',
      placeholder: 'United States',
      show: true,
      items: countries
    },
    {
      label: 'Phone number',
      key: 'phone_number',
      type: 'string',
      show: true
    }
  ];

  const checkModel = () => {
    const { success }: any = isIdentityValid({
      ...newCompany,
      type:
        newCompany.entity_type === individual ? entity_type[0] : entity_type[1]
    });
    if (!success) {
      alert(`Please fill all fields required.`);
    }
    return true;
  };

  const getIdentities = async () => {
    const { data } = await fetchIdentities();
    if (data && data.length > 0) {
      const hasOne = data.find((x: any) => x.entity_type === individual);
      setHasOneIndividual(hasOne);
    }
  };

  const saveNewCompany = async () => {
    if (!checkModel()) return;
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('identities')
        .upsert(
          {
            ...newCompany,
            kyc_status: 'queued',
            user_email: user.email,
            us_domestic: newCompany.us_domestic === 'Yes',
            type:
              newCompany.entity_type === individual
                ? entity_type[0]
                : entity_type[1],
            provider: 'NAMESCAN'
          },
          { onConflict: 'id' }
        )
        .select()
        .single();

      if (error) {
        return notify('Sorry, something went wrong. Please try again');
      }

      notify('Successfully created!', true);

      // 2. set parent_entity_id
      const { data: _data } = await supabase
        .from('identities')
        .update({
          parent_identity_id: data.id
        })
        .eq('id', parentEntityId)
        .select();

      onUpdate();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const disableSave = () => {
    let result = isIdentityValid(newCompany);
    if (newCompany.entity_type === individual) {
      if (result) return !result.success;
    }
    if (result && agree && parentEntityId) return !result.success;
    return true;
  };

  useEffect(() => {
    getIdentities();
  }, []);

  useEffect(() => {
    if (identity) {
      setNewCompany((prev: any) => ({ ...prev, ...identity }));
      setParentEntityId(identity.parent_identity_id);
    }
  }, [identity]);

  return (
    <div>
      <div className="mb-4">
        {!hasOneIndividual && (
          <Alert
            close={false}
            color="bg-sky-50 text-sky-500"
            content={
              <div className="flex gap-1 text-sm font-medium">
                Please create an individual identity for an authorized signer
                before creating one for your entity.
              </div>
            }
          />
        )}
      </div>
      {newCompany && (
        <>
          <FormBuilder
            data={newCompany}
            model={model}
            emit={true}
            onSubmit={(v: any) => {
              if (!isEqual(v, newCompany)) {
                setNewCompany((prev: any) => ({
                  ...prev,
                  ...v
                }));
              }
            }}
          />
          {newCompany.entity_type !== investment_identity_types[0] && (
            <div className="my-4">
              <IdentityList
                type={'Individual'}
                selectedId={parentEntityId}
                onSelect={(id: string) => {
                  console.log(id);
                  setParentEntityId(id);
                }}
              />
            </div>
          )}
        </>
      )}
      {newCompany && (
        <>
          {newCompany.country_of_citizenship === 'Russian Federation' && (
            <Alert
              color="text-red-600 bg-red-100"
              content={
                <span>
                  {' '}
                  Sorry, your country is not allowed to invest through
                  Allocations.com. Please email support@allocations.com for more
                  information.
                </span>
              }
            />
          )}
          {newCompany.country_of_citizenship !== 'Russian Federation' && (
            <div className="my-8">
              {newCompany.entity_type !== individual && (
                <div className="mb-4">
                  <Checkbox
                    selected={agree}
                    onChange={() => setAgree(!agree)}
                    label={`I am an authorized signatory for this entity.`}
                  />
                </div>
              )}
              <div className="flex items-center">
                <Button
                  disabled={disableSave()}
                  loading={loading}
                  label={'Save identity'}
                  onClick={() => saveNewCompany()}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
