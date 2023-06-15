'use client';
import Card from '@mui/material/Card';

import LoadingApp from '@/components/Loading/App';
import ModalButton from '@/components/Modal/Button';
import OrganizationItem from '@/components/Organizations/Item';
import NewOrganization from '@/components/Organizations/New';
import PageHeader from '@/components/Page/Header';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchOrganizations, supabase } = useSupabase();

  const getOrganizations = async () => {
    setOrganizations([]);
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
    const organizationsRoles = supabase
      .channel('organizations_subscribers')
      .on(
        // @ts-ignore
        'postgres_changes',
        {
          event: `*`,
          schema: 'public',
          table: 'organizations'
        },
        (payload: any) => {
          getOrganizations();
        }
      )
      .subscribe();
  }, []);

  return (
    <Card className="container card" variant="outlined">
      {loading && <LoadingApp />}
      {!loading && (
        <div className="w-full">
          <PageHeader
            header={{
              name: 'Organizations',
              description: 'Manage your organizations.',
              length: organizations.length
            }}
            content={
              <ModalButton
                title="Create a new organization"
                content={<NewOrganization onCreate={() => {}} />}
              />
            }
          />
          <div className="grid gap-2">
            {organizations.map((organization: any, index: number) => (
              <div key={index}>
                <OrganizationItem organization={organization} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
