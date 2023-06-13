'useClient';
import { countries } from '@/app/(private)/config';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import OnboardingUser from '@/components/Onboarding/User';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';

export default function NewCompany({
  type,
  onUpdate
}: {
  type: string;
  onUpdate: () => void;
}) {
  const [newUser, setNewUser] = useState<any>({
    citizenship_country: undefined
  });
  const [newCompany, setNewCompany] = useState<any>({
    country: undefined
  });
  const [agree, setAgree] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user, notify } = useAuthContext();
  const { updateUser } = useSupabase();

  const model: Field[] = [
    {
      label: 'Select a country',
      key: 'country',
      type: 'select',
      placeholder: 'United States',
      show: true,
      items: countries
    },
    {
      label: 'Your entity name',
      key: 'legal_name',
      type: 'string',
      placeholder: 'Your new entity name',
      show: true
    },
    {
      label: 'Date of formation',
      key: 'date_of_entity_formation',
      type: 'date',
      show: true
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

  const saveNewEntity = async () => {
    try {
      setLoading(true);

      const response = await updateUser({
        email: user.email,
        ...newUser
      });

      if (response) {
        notify('Personal informations saved!', true);
      }

      // if (response) {
      //   onUpdate();
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.first_name)
        setNewCompany((prev: any) => ({
          ...prev,
          first_name: user.first_name
        }));
      if (user.last_name)
        setNewCompany((prev: any) => ({
          ...prev,
          last_name: user.last_name
        }));
    }
  }, [user]);

  useEffect(() => {
    console.log(newCompany);
  }, [newCompany]);

  return (
    <div>
      <div className="mb-4">
        <h2>Your personal informations</h2>
        <OnboardingUser onChange={(newUser: any) => setNewUser(newUser)} />
      </div>
      {newCompany.country === 'Russian Federation' && (
        <Alert severity="error">
          Sorry, your country is not allowed to invest through Allocations.com.
          Please email support@allocations.com for more informations.
        </Alert>
      )}
      {newCompany.country !== 'Russian Federation' && (
        <div>
          <h2>Your new entity informations</h2>
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
          <div className="my-4">
            <Button
              loading={loading}
              label={'Save new entity'}
              onClick={() => saveNewEntity()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
