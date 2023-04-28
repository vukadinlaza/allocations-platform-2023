'use client';

import { useAuthContext } from '@/app/context';
import List from '@/components/List';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import supabase from '@/lib/supabase';
import { Search } from '@mui/icons-material';
import { Alert, Card, Grid, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { headers_tables } from '../config';

export default function Entities() {
  const [search, setSearch] = useState<string | null>(null);
  const [entities, setEntities] = useState<Array<any>>([]);
  const [limit, setLimit] = useState<number>(10);
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuthContext();

  const getTaxColor = (status: string) => {};

  const fetchEntities = async () => {
    if (!user && !user.organizations) return;
    try {
      setLoading(true);
      // TODO: entities related to user.organizations here please
      let { data: _entities }: any = await supabase
        .from('entities')
        .select(`*`)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (_entities && _entities.length > 0) {
        setEntities(_entities);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async () => {
    if (!user && !user.organizations && !search) return;
    try {
      setLoading(true);
      let { data: _results }: { data: any } = await supabase
        .from('entities')
        .select(`*`)
        .textSearch('name', search)
        .order('name', { ascending: true });

      if (_results && _results.length > 0) {
        setResults(_results);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search && search.length > 0) {
      setLoading(true);
      const _search = setTimeout(() => {
        onSearch();
      }, 1000);
      return () => clearTimeout(_search);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <main>
      <Card className="card" variant="outlined">
        <header>
          <div>
            <h1>Entities</h1>
            <p>Manage your entities.</p>
          </div>
          <div>
            <button disabled className="btn primary">
              Migrate
            </button>
            <button disabled className="btn primary">
              Create new
            </button>
          </div>
        </header>
        <Grid container xs={12} className="mb-6">
          <Grid item xs={8}>
            <TextField
              id="outlined-start-adornment"
              size="small"
              placeholder="Search for entities..."
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
                As an admin, you can look for any entity.
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
          {!loading && (
            <Grid item xs={12} className="w-full">
              {search && (
                <div className="onsearch">
                  {!results.length && <None text="No entities found." />}
                  {results.length > 0 && (
                    <List headers={headers_tables.entities} data={results} />
                  )}
                </div>
              )}
              {!search && (
                <div>
                  {entities.length < 1 && (
                    <None text="No entities yet. Create one?" />
                  )}
                  {entities.length > 0 && (
                    <List headers={headers_tables.entities} data={entities} />
                  )}
                </div>
              )}
            </Grid>
          )}
        </Grid>
      </Card>
    </main>
  );
}
