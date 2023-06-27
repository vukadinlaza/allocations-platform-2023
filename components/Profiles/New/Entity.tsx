'use client';
import { countries } from '@/app/(private)/config';
import { useAuthContext } from '@/app/(private)/context';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { entity_tax_id_type, investment_profile_type } from '@/types/values';
import { useEffect, useState } from 'react';
import ProfileList from '../List';

export default function NewEntity({
  entity_type,
  code,
  identity,
  onCreate
}: {
  entity_type?: string;
  code?: string;
  identity?: any;
  onCreate?: () => void;
}) {
  const { user, notify } = useAuthContext();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [newEntity, setNewEntity] = useState<any>({
    type: investment_profile_type[1],
    provider: 'NAMESCAN',
    us_domestic: false
  });
  const [parentEntityId, setParentEntityId] = useState<string | null>('');

  const checkForm = () => {
    const keys = [
      'address_line_1',
      'city',
      'country',
      'date_of_entity_formation',
      'entity_type',
      'legal_name',
      'postal_code',
      'region',
      'tax_id',
      'tax_id_type'
    ];
    const isFormValid = keys.every((key) => newEntity[key]);
    return isFormValid;
  };

  const saveEntity = async () => {
    if (!parentEntityId)
      return alert('Please select at least one signer profile.');
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('identities')
        .upsert(
          {
            ...newEntity,
            user_email: user.email,
            parent_identity_id: parentEntityId
          },
          { onConflict: 'id' }
        )
        .select()
        .single();

      if (error) {
        return notify('Sorry, something went wrong. Please try again');
      }

      notify('Successfully created!', true);

      if (onCreate) onCreate();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (entity_type) {
      setNewEntity((prev: any) => ({ ...prev, entity_type }));
    }
  }, [entity_type]);

  useEffect(() => {
    if (identity) {
      setNewEntity((prev: any) => ({ ...prev, ...identity }));
      if (identity.parent_entity_id)
        setParentEntityId(identity.parent_entity_id);
    }
  }, [identity]);

  return (
    <div className="grid gap-2 my-2">
      {code && (
        <>
          {code === 'queued' && (
            <Alert
              close={false}
              color="text-sky-600 bg-sky-100 cursor-pointer hover:bg-sky-100 transition"
              content={
                <span className="text-sm font-medium">
                  This identity is being verified. We appreciate your patience.
                </span>
              }
            />
          )}
        </>
      )}
      {code === 'missing_data' && (
        <Alert
          close={false}
          color="text-amber-600 bg-amber-100 cursor-pointer hover:bg-amber-100 transition"
          content={
            <span className="text-sm font-medium">
              Please complete your identity information before proceeding with
              any investments.
            </span>
          }
        />
      )}
      <div>
        <label htmlFor="">Your entity name*</label>
        <input
          type="text"
          placeholder={'John Smith LLC'}
          className={`${loading ? 'disabled' : ''}`}
          value={newEntity.legal_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
              ...prevData,
              legal_name: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Is this a US Domestic entity?*</label>
        <Select
          selected={newEntity.us_domestic ? 'Yes' : 'No'}
          items={['Yes', 'No']}
          onChange={(v: string) => {
            setNewEntity((prevData: any) => ({
              ...prevData,
              us_domestic: v === 'Yes'
            }));
          }}
        />
      </div>
      <div>
        <label htmlFor="">Date of formation*</label>
        <input
          type="date"
          placeholder={'John Smith'}
          className={`${loading ? 'disabled' : ''}`}
          value={newEntity.date_of_entity_formation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
              ...prevData,
              date_of_entity_formation: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Tax ID*</label>
        <input
          type="text"
          placeholder={'Enter your tax ID (if not, 0)'}
          className={`${loading ? 'disabled' : ''}`}
          value={newEntity.tax_id}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
              ...prevData,
              tax_id: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Tax ID type*</label>
        <Select
          selected={newEntity.tax_id_type}
          items={entity_tax_id_type}
          onChange={(tax_id_type: string) => {
            setNewEntity((prevData: any) => ({
              ...prevData,
              tax_id_type
            }));
          }}
        />
      </div>
      <div>
        <label htmlFor="">Principal place of business (Address)*</label>
        <input
          type="text"
          placeholder={'500 Madison Ave'}
          className={`${loading ? 'disabled' : ''}`}
          value={newEntity.address_line_1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
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
          value={newEntity.address_line_2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
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
          value={newEntity.city}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
              ...prevData,
              city: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">State of formation*</label>
        <input
          type="text"
          placeholder={'Florida'}
          className={`${loading ? 'disabled' : ''}`}
          value={newEntity.region}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
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
          value={newEntity.postal_code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
              ...prevData,
              postal_code: e.target.value
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="">Country*</label>
        <Select
          selected={newEntity.country}
          items={countries.filter((x) => x !== 'Russian Federation')}
          onChange={(country: string) => {
            setNewEntity((prevData: any) => ({
              ...prevData,
              country
            }));
          }}
        />
      </div>
      <div>
        <label htmlFor="">Phone</label>
        <input
          type="text"
          placeholder={'+123467890'}
          className={`${loading ? 'disabled' : ''}`}
          value={newEntity.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewEntity((prevData: any) => ({
              ...prevData,
              phone: e.target.value
            }))
          }
        />
      </div>
      <div>
        <ProfileList
          selectedId={parentEntityId}
          onSelect={(parent_entity_id: string) => {
            setParentEntityId(parent_entity_id);
          }}
        />
      </div>
      <div>
        <Button
          label="Save"
          loading={loading}
          disabled={!checkForm()}
          onClick={() => saveEntity()}
        />
      </div>
    </div>
  );
}
