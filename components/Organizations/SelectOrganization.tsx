import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { Organization } from '@/types';
import { useEffect, useState } from 'react';

export default function SelectOrganization({
  onSave,
  onChange
}: {
  onSave: () => any;
  onChange: (o: Organization | undefined) => any;
}) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const found = organizations?.find((o) => o.name === selectedOrganization);
    onChange(found)
  }, [selectedOrganization]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Select an organization</h2>
        <p>List of your current organizations</p>
      </header>
      {loading && <div className="w-full h-12 loading" />}
      {!loading && (
        <Select
          items={organizations}
          onChange={(str: string) => {
            setSelectedOrganization(str);
          }}
          displayLabel={(x) => x.name}
        />
      )}
      <div className="mt-4">
        <Button loading={loading} onClick={() => onSave()} label="Save" />
      </div>
    </div>
  );
}
