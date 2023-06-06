import { useAuthContext } from 'app/(private)/context';
import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal, Organization } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from '@/components/Select';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type Props = {
  type?: string;
  onCreate: () => void;
};

export default function NewDeal({ onCreate, type = 'spv' }: Props) {
  const { supabase } = useSupabase();
  const { notify, user } = useAuthContext();
  const [newDeal, setNewDeal] = useState<Deal | any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<
    {
      label: string,
      id: string,
    } | null
  >(null);

  const { fetchOrganizations } = useSupabase();

  const getOrganizations = async () => {
    try {
      setLoading(true);
      let { data, error } = await fetchOrganizations();

      if (data) {
        setOrganizations(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  const createNew = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .insert({
          ...newDeal,
          user_email: user.email,
          type,
          is_migration: false,
          organization_id: selectedOrganization?.id as string,
        })
        .select()
        .single();

      if (error) {
        notify(`Sorry, could not create new deal.`, false);
        return;
      }
      if (data) {
        setNewDeal({});
        notify('Successfully created !', true);
        onCreate();
        router.push(`/deals/${data.id}`);
      }
    } catch (error) {
      notify(`Sorry, could not create new deal.`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {newDeal && (
        <div>
          <div className="mb-6 w-96">
            <p className="mb-2">Enter your deal name:</p>
            <input
              type="text"
              placeholder={'Your deal name'}
              disabled={loading}
              className={`${loading ? 'disabled' : ''}`}
              value={newDeal.name || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewDeal((prevData: any) => ({
                  ...prevData,
                  name: e.target.value
                }))
              }
            />
          </div>
          <div className="mb-6 w-96">
            <header className="flex flex-col items-start mb-4">
              <h2 className="text-xl">Select an organization</h2>
              <p>List of your current organizations</p>
            </header>
            {loading && <div className="w-full h-12 loading" />}
            {!loading && (
              <Autocomplete
                options={organizations.map((o) => ({
                  label: o.name,
                  id: o.id
                }))}
                renderInput={(params) => <TextField {...params} label="Organization Name" />}
                value={selectedOrganization}
                getOptionLabel={(option:any) => option?.label ?? "[No Name]"}
                onChange={(event: any, newValue: any) => {
                  setSelectedOrganization(newValue);
                }}
              />
            )}
          </div>
          <Button
            loading={loading}
            disabled={loading || !selectedOrganization}
            label={'Create'}
            onClick={createNew}
          />
        </div>
      )}
    </>
  );
}
