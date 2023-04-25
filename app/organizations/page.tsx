'use client';

import { useAuthContext } from '@/app/context';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import List from '@/components/Organizations/List';
import supabase from '@/lib/supabase';
import { Search } from '@mui/icons-material';
import { Alert, Card, Grid, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Organizations() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Array<any>>([]);
  const [organizations, setOrganizations] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuthContext();

  const fetchOrganizations = async () => {
    if (!user && !user.organizations) return;
    try {
      setLoading(true);
      // TODO: organizations related to user.organizations here please
      let { data: _organizations } = await supabase
        .from('organizations')
        .select(`*`)
        .order('created_at', { ascending: false })
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
    if (search && search.length > 0) {
      console.log(search);
    }
  }, [search]);

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
        <Grid container xs={12} className="mb-6">
          <Grid item xs={8}>
            <TextField
              id="outlined-start-adornment"
              size="small"
              placeholder="Search for organizations..."
              sx={{ width: '300px' }}
              onInput={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          {user.infos && user.infos.is_super_admin && (
            <Grid item xs={4} className="mb-4">
              <Alert severity="success">
                As an admin, you can look for any organization.
              </Alert>
            </Grid>
          )}
        </Grid>
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
