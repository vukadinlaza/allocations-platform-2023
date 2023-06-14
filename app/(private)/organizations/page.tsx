'use client';
import Card from '@mui/material/Card';

import LoadingApp from '@/components/Loading/App';
import OrganizationItem from '@/components/Organizations/Item';
import PageHeader from '@/components/Page/Header';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  return (
    <Card className="container card" variant="outlined">
      {loading && <LoadingApp />}
      {!loading && (
        <div className="w-full">
          <PageHeader
            header={{
              name: 'Organizations',
              description: 'Manage your organizations.',
              length: organizations.length,
              buttons: [
                {
                  type: 'organization'
                }
              ]
            }}
          />
          <div className="grid gap-2">
            {organizations.map((organization: any, index: number) => (
              <OrganizationItem key={index} organization={organization} />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
