'useClient';
import { countries } from '@/app/(private)/config';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import FormBuilder from '@/components/FormBuilder';
import { IdentityList } from '@/components/Identity/List';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import {
  entity_tax_id_type,
  entity_type,
  investment_identity_types
} from '@/types/values';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';

export default function NewCompany({
  type,
  onUpdate,
  identity
}: {
  type: string;
  onUpdate: () => void;
  identity?: any;
}) {
  const [newCompany, setNewCompany] = useState<any>({
    country_of_citizenship: undefined
  });
  const [agree, setAgree] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, notify } = useAuthContext();
  const { supabase } = useSupabase();

  // set parent here
  const [parentEntityId, setParentEntityId] = useState<any>(null);

  const individual = investment_identity_types[0];

  const model: Field[] = [
    {
      label: 'Select a country of citizenship',
      key: 'country_of_citizenship',
      type: 'select',
      placeholder: 'United States',
      show: type === individual,
      items: countries
    },
    {
      label: 'Is this a US Domestic entity?',
      key: 'us_domestic',
      type: 'select',
      show: type !== individual,
      items: ['Yes', 'No']
    },
    {
      label: 'Tax ID',
      key: 'tax_id',
      type: 'string',
      placeholder: 'Enter your tax ID',
      show: true
    },
    {
      label: 'Tax ID type',
      key: 'tax_id_type',
      type: 'select',
      placeholder: 'SSN / EIN / ITIN / FTIN',
      show: true,
      items: entity_tax_id_type.filter((x) => {
        if (type === individual) {
          return x !== 'EIN';
        }
        return x;
      })
    },
    {
      label: type === individual ? 'Your full name' : 'Your entity name',
      key: 'legal_name',
      type: 'string',
      placeholder: type === individual ? 'John Smith' : 'Example, LLC',
      show: true
    },
    {
      label: type === individual ? 'Date of birth' : 'Date of formation',
      key: 'date_of_entity_formation',
      type: 'date',
      show: true
    },
    {
      label:
        type === individual
          ? 'Address Line 1'
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
      label: 'City',
      key: 'city',
      type: 'string',
      placeholder: 'Miami',
      show: true
    },
    {
      label: type === individual ? 'State / Region' : 'State of formation',
      key: 'region',
      type: 'string',
      placeholder: 'Florida',
      show: true
    },
    {
      label: 'ZIP / Postal Code',
      key: 'postal_code',
      type: 'string',
      placeholder: '888888',
      show: true
    },
    {
      label: 'Select a country',
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

  const saveNewCompany = async () => {
    // TODO: come back
    // const keys = model
    //   .filter((x) => x.show && x.key !== 'region' && x.key !== 'address_line_2')
    //   .map(({ key }) => key);

    // console.log(keys);

    // console.log({
    //   ...newCompany,
    //   user_email: user.email,
    //   entity_type: type,
    //   us_domestic: newCompany.us_domestic === 'Yes',
    //   type: type === individual ? entity_type[0] : entity_type[1],
    //   provider: 'NAMESCAN'
    // });

    // const allCompanyKeysExist = keys.every((key: any) => {
    //   Object.keys(newCompany).includes(key);
    // });

    // if (!allCompanyKeysExist) {
    //   alert('Please fill in all fields.');
    //   return;
    // }

    try {
      setLoading(true);

      // 1. create entity
      const { data, error } = await supabase
        .from('identities')
        .insert({
          ...newCompany,
          user_email: user.email,
          entity_type: type,
          us_domestic: newCompany.us_domestic === 'Yes',
          type: type === individual ? entity_type[0] : entity_type[1],
          provider: type !== individual ? undefined : 'NAMESCAN'
        })
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
    if (type === individual) return false;
    if (!parentEntityId) return true;
    return !agree;
  };

  useEffect(() => {
    if (identity && !newCompany.country_of_citizenship) {
      setNewCompany(identity);
      setParentEntityId(identity.parent_identity_id);
    }
  }, [identity]);

  return (
    <div>
      {newCompany.country_of_citizenship === 'Russian Federation' && (
        <Alert severity="error">
          Sorry, your country is not allowed to invest through Allocations.com.
          Please email support@allocations.com for more information.
        </Alert>
      )}
      {newCompany.country_of_citizenship !== 'Russian Federation' && (
        <div>
          <FormBuilder
            data={newCompany}
            model={model}
            emit={true}
            onSubmit={(v: any) => {
              setNewCompany((prev: any) => ({
                ...prev,
                ...v
              }));
            }}
          />
          {type !== individual && (
            <div className="my-4">
              <IdentityList
                type={'Individual'}
                selectedId={parentEntityId}
                onSelect={(id: string) => {
                  setParentEntityId(id);
                }}
              />
            </div>
          )}

          <div className="my-8">
            {type !== individual && (
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
        </div>
      )}
    </div>
  );
}
