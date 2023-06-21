'use client';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import Select from '../Select';

export default function SelectManager({
  selected,
  onChange,
  organizationId
}: {
  selected?: string;
  onChange: any;
  organizationId: string;
}) {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [members, setMembers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const getOrganization = async () => {
    if (!organizationId) return;
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from('organizations')
        .select('*, organizations_roles(*)')
        .eq('id', organizationId)
        .single();

      if (data) {
        const { organizations_roles } = data;
        setMembers(organizations_roles);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selected) setSelectedEmail(selected);
  }, []);

  useEffect(() => {
    if (selectedEmail) {
      onChange(selectedEmail);
    }
  }, [selectedEmail]);

  useEffect(() => {
    if (organizationId) getOrganization();
  }, [organizationId]);

  return (
    <div className="w-full pb-4 SelectManager">
      <header className="flex flex-col mb-4 items-left">
        <h2 className="text-xl">Select a manager</h2>
        <label>Members of your selected organization</label>
      </header>
      <main>
        {loading && <div className="w-full h-12 loading" />}
        {!loading && (
          <div>
            <Select
              placeholder="Select a manager..."
              selected={selectedEmail}
              items={members.map((o: any) => o.user_email)}
              onChange={(str: string) => {
                setSelectedEmail(str);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
