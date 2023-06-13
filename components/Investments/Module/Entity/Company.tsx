'useClient';
import { countries } from '@/app/(private)/config';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import OnboardingUser from '@/components/Onboarding/User';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import Alert from '@mui/material/Alert';
import Image from 'next/image';
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
  const { supabase, updateUser } = useSupabase();

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

  const saveNewCompany = async () => {
    const userMapped = [
      'first_name',
      'last_name',
      'citizenship_country',
      'birthdate'
    ];

    const allUserKeysExist = userMapped.every((key: any) =>
      Object.keys(newCompany).includes(key)
    );

    if (!allUserKeysExist) {
      alert('Please fill in all fields about your personal information.');
      return;
    }

    const companyMapped = model
      .map(({ key }) => key)
      .filter((key) => key !== 'region');

    const allCompanyKeysExist = companyMapped.every((key: any) =>
      Object.keys(newCompany).includes(key)
    );

    if (!allCompanyKeysExist) {
      alert('Please fill in all fields (state is mandatory only for USA).');
      return;
    }

    try {
      setLoading(true);

      // 1. Update user
      const response = await updateUser({
        email: user.email,
        ...newUser
      });

      if (response) {
        notify('Personal informations saved!', true);
      }

      // 2. Create new entity

      const { data, error } = await supabase
        .from('new_identities')
        .insert({ ...newCompany, user_email: user.email, type });

      if (error) {
        return notify('Sorry, something went wrong. Please try again');
      }

      notify('Successfully created!', true);
      onUpdate();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(newCompany);
  }, [newCompany]);

  return (
    <div>
      <div className="mb-8">
        <header className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-gray-500/5">
          <div className="flex items-center justify-center p-1 rounded-full bg-primary-500/10 text-primary-500">
            <Image src="/user.svg" alt={'confirm'} width={24} height={24} />
          </div>
          <div>
            <h2>Your personal information</h2>
            <p className="text-xs">
              Please fill in your personal information to create your new
              entity.
            </p>
          </div>
        </header>
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
          <header className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-gray-500/5">
            <div className="flex items-center justify-center p-1 rounded-full bg-primary-500/10 text-primary-500">
              <Image src="/entity.svg" alt={'confirm'} width={24} height={24} />
            </div>
            <div>
              <h2>Your new entity</h2>
              <p className="text-xs">
                Please complete each field to create your new entity.
              </p>
            </div>
          </header>
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
          <div className="mt-8">
            <Button
              loading={loading}
              label={'Save new entity'}
              onClick={() => saveNewCompany()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
