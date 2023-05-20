import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal, Organization } from '@/types';
import { useEffect, useState } from 'react';

export default function SelectOrganization({ deal }: { deal: Deal }) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selected, setSelected] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { fetchOrganizations, supabase } = useSupabase();
  const { notify } = useAuthContext();

  const getOrganizations = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data, error } = await fetchOrganizations();

      if (data) {
        setOrganizations(data);
        setSelected(data[0].name);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const saveDeal = async () => {
    if (!deal) return;
    console.log(selected.id);
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('deals')
        .upsert({ id: deal.id, organization_id: selected.id });

      if (error) {
        notify(`Sorry, could not save organization.`, false);
        return;
      }
      notify('Organization saved.', true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <div className="flex items-start border rounded card">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Link an organization</h2>
        <p>List of your current organizations</p>
      </header>
      {loading && <div className="w-full h-12 loading" />}
      {!loading && (
        <Select
          items={organizations}
          onChange={(x: string) =>
            setSelected(organizations.find((o) => o.name === x))
          }
          selected={selected?.name}
          displayLabel={(x) => x.name}
        />
      )}
      <div className="mt-4">
        <Button loading={loading} onClick={saveDeal} label="Save" />
      </div>
    </div>
  );
}
