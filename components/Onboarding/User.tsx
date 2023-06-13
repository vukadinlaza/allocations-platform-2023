'useClient';
import { countries } from '@/app/(private)/config';
import { useAuthContext } from '@/app/(private)/context';
import FormBuilder from '@/components/FormBuilder';
import { Field } from '@/types';
import { useEffect, useState } from 'react';

export default function OnboardingUser({
  onChange
}: {
  onChange: (newUser: any) => void;
}) {
  const [newUser, setNewUser] = useState<any>(undefined);

  const { user } = useAuthContext();

  const model: Field[] = [
    {
      label: 'Your first name',
      key: 'first_name',
      type: 'string',
      placeholder: 'Your first name',
      show: true
    },
    {
      label: 'Your last name',
      key: 'last_name',
      type: 'string',
      placeholder: 'Your last name',
      show: true
    },
    {
      label: 'Your citizenship country',
      key: 'citizenship_country',
      type: 'select',
      placeholder: 'Your citizenship country',
      show: true,
      items: countries
    },
    {
      label: 'Your birthdate',
      key: 'birthdate',
      type: 'date',
      show: true
    }
  ];

  useEffect(() => {
    if (user) {
      const keys = model.map((m) => m.key);
      keys.forEach((key: any) => {
        if (user[key])
          setNewUser((prev: any) => ({
            ...prev,
            [key]: user[key]
          }));
      });
    }
  }, [user]);

  useEffect(() => {
    onChange(newUser);
  }, [newUser]);

  return (
    <>
      {user && (
        <FormBuilder
          data={newUser}
          model={model}
          emit={true}
          onSubmit={(v: any) => {
            setNewUser((prev: any) => ({
              ...prev,
              ...v
            }));
          }}
        />
      )}
    </>
  );
}
