'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { Card, Grid } from '@mui/material';
import LoadingList from '@/components/Loading/List';
import { useAuthContext } from '@/app/context';
import None from '@/components/None';

export default function Entities() {
  const [organizations, setOrganizations] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const { user } = useAuthContext();

  // const fetchOrganizations = async () => {
  //   if (!user && !user.organizations) return;
  //   const orgsIdArray = user.organizations.map((x) => x.organization_id);
  //   try {
  //     setLoading(true);
  //     let { data: _organizations } = await supabase
  //       .from('organizations')
  //       .select('*')
  //       .in('id', orgsIdArray)
  //       .order('name');

  //     if (_organizations && _organizations.length > 0) {
  //       // setOrganizations(_organizations);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchOrganizations();
  // }, []);

  return (
    <main>
      <Card className="card" variant="outlined">
        <header className="flex items-start justify-between w-full mb-8">
          <div>
            <h1>Entities</h1>
            <p>Manage your entities.</p>
          </div>
          <button className="btn primary">Create a new</button>
        </header>
        <Grid container>
          {loading && (
            <Grid item xs={12} className="w-full">
              <LoadingList />
            </Grid>
          )}
          {!loading && !organizations.length && (
            <Grid item xs={12} className="w-full">
              <None text="No entities yet. Create one?" />
            </Grid>
          )}
        </Grid>
      </Card>
    </main>
  );
}
