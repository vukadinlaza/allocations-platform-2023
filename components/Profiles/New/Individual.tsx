'use client';
import { countries } from '@/app/(private)/config';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import {
  entity_tax_id_type,
  investment_identity_types,
  investment_profile_type
} from '@/types/values';
import { useEffect, useState } from 'react';

export default function NewIndividual({
  identity,
  onCreate
}: {
  identity?: any;
  onCreate?: () => void;
}) {
  const { user, notify } = useAuthContext();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [newIndividual, setNewIndividual] = useState<any>({
    entity_type: investment_identity_types[0],
    type: investment_profile_type[0],
    provider: 'NAMESCAN'
  });

  const checkForm = () => {
    const keys = [
      'entity_type',
      'type',
      'tax_id_type',
      'legal_name',
      'date_of_entity_formation',
      'country_of_citizenship',
      'tax_id',
      'address_line_1',
      'city',
      'region',
      'postal_code',
      'country'
    ];
    const isFormValid = keys.every((key) => newIndividual[key]);
    // return isFormValid;
    return true;
  };

  const saveIndividual = async () => {
    if (onCreate) {
      onCreate();
    }
    // try {
    //   setLoading(true);

    //   const { data, error } = await supabase
    //     .from('identities')
    //     .upsert(
    //       { ...newIndividual, user_email: user.email },
    //       { onConflict: 'id' }
    //     )
    //     .select()
    //     .single();

    //   if (error) {
    //     return notify('Sorry, something went wrong. Please try again');
    //   }

    //   notify('Successfully created!', true);

    //   if (onCreate) onCreate();
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    setNewIndividual((prev: any) => ({ ...prev, ...identity }));
  }, [identity]);

  useEffect(() => {
    checkForm();
  }, [newIndividual]);

  return (
    <div className="grid gap-2 my-2">
      <div>
        <label htmlFor="">Your full name*</label>
        <input
          type="text"
          placeholder={'John Smith'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.legal_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              legal_name: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Date of birth*</label>
        <input
          type="date"
          placeholder={'John Smith'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.date_of_entity_formation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              date_of_entity_formation: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Citizenship*</label>
        <Select
          selected={newIndividual.country_of_citizenship}
          items={countries}
          onChange={(country_of_citizenship: string) => {
            setNewIndividual((prevData: any) => ({
              ...prevData,
              country_of_citizenship
            }));
          }}
        />
      </div>
      <div>
        <label htmlFor="">Tax ID*</label>
        <input
          type="text"
          placeholder={'Enter your tax ID (if not, 0)'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.tax_id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              tax_id: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Tax ID type*</label>
        <Select
          selected={newIndividual.tax_id_type}
          items={entity_tax_id_type.filter((x) => x !== 'EIN')}
          onChange={(tax_id_type: string) => {
            setNewIndividual((prevData: any) => ({
              ...prevData,
              tax_id_type
            }));
          }}
        />
      </div>
      <div>
        <label htmlFor="">Address line 1*</label>
        <input
          type="text"
          placeholder={'500 Madison Ave'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.address_line_1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              address_line_1: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Address line 2</label>
        <input
          type="text"
          placeholder={'Suite C'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.address_line_2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              address_line_2: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">City*</label>
        <input
          type="text"
          placeholder={'Miami'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              city: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">State/Region*</label>
        <input
          type="text"
          placeholder={'Florida'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.region}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              region: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">ZIP Code*</label>
        <input
          type="text"
          placeholder={'888888'}
          className={`${loading ? 'disabled' : ''}`}
          value={newIndividual.postal_code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewIndividual((prevData: any) => ({
              ...prevData,
              postal_code: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Country*</label>
        <Select
          selected={newIndividual.country}
          items={countries.filter((x) => x !== 'Russian Federation')}
          onChange={(country: string) => {
            setNewIndividual((prevData: any) => ({
              ...prevData,
              country
            }));
          }}
        />
      </div>
      <div>
        <Button
          label="Save"
          disabled={!checkForm()}
          onClick={() => saveIndividual()}
        />
      </div>
    </div>
  );
}
