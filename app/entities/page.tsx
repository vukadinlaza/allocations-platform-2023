'use client';

import Entities from '@/components/Entities/Index';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import { Card, Grid } from '@mui/material';
import { useState } from 'react';

export default function Entities() {
  const [entitiesData, setEntitiesData] = useState<Array<any>>([]);
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
          <div className="flex items-center">
            <button className="btn info" disabled>
              Migrate
            </button>
            <button className="btn primary" disabled>
              Create new
            </button>
          </div>
        </header>
        <Grid container>
          {loading && (
            <Grid item xs={12} className="w-full">
              <LoadingList />
            </Grid>
          )}
          {!loading && !entitiesData.length && (
            <Grid item xs={12} className="w-full">
              <None text="No entities yet. Create one?" />
            </Grid>
          )}
          {!loading && entitiesData.length > 0 && (
            <Grid item xs={12}>
              <Entities />
            </Grid>
          )}
        </Grid>
      </Card>
    </main>
  );
}
