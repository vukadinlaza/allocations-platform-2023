'use client';

import { useAuthContext } from '@/app/context';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import List from '@/components/Organizations/List';
import supabase from '@/lib/supabase';
import { Alert, Card, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuthContext();

  const fetchOrganizations = async () => {
    if (!user && !user.organizations) return;
    const orgsIdArray = user.organizations.map((x) => x.organization_id);
    try {
      setLoading(true);
      let { data: _organizations } = await supabase
        .from('organizations')
        .select(`*`)
        .limit(10);

      if (_organizations && _organizations.length > 0) {
        setOrganizations(_organizations);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <main>
      <Card className="card" variant="outlined">
        <header>
          <div>
            <h1>Organizations</h1>
            <p>Manage your organizations.</p>
          </div>
          <button disabled className="btn primary">
            Create new
          </button>
        </header>
        {user.infos && user.infos.is_super_admin && (
          <Grid container xs={12}>
            <Alert className="mb-6 " severity="success">
              As an admin, you can see every organization.
            </Alert>
          </Grid>
        )}
        <Grid container>
          {loading && (
            <Grid item xs={12} className="w-full">
              <LoadingList />
            </Grid>
          )}
          {!loading && !organizations.length && (
            <Grid item xs={12} className="w-full">
              <None text="No organization yet. Create one?" />
            </Grid>
          )}
          {!loading && organizations.length > 0 && (
            <Grid item xs={12} className="w-full">
              <List data={organizations} />
            </Grid>
          )}
        </Grid>
      </Card>
    </main>
  );
}
