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

export default function SPVs() {
  const [search, setSearch] = useState<string | null>(null);
  const [spvs, setSpvs] = useState<Array<any>>([]);
  const [limit, setLimit] = useState<number>(10);
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useAuthContext();

  const getTaxColor = (status: string) => {};

  const fetchSPVs = async () => {
    if (!user) return;
    try {
      setLoading(true);
      // TODO: spvs related to user.organizations here please
      let { data: _spvs }: any = await supabase
        .from('deals')
        .select(`*`)
        .eq('type', 'spv')
        .order('created_at', { ascending: true })
        .limit(limit);

      if (_spvs && _spvs.length > 0) {
        setSpvs(_spvs);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async () => {
    if (!user && !search) return;
    try {
      setLoading(true);
      let { data: _results }: { data: any } = await supabase
        .from('deals')
        .select()
        .textSearch('name', search, {
          type: 'websearch'
        })
        .eq('type', 'spv');

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
    fetchSPVs();
  }, []);

  return (
    <main>
      <Card className="card" variant="outlined">
        <header>
          <div>
            <h1>SPVs</h1>
            <p>Manage your spvs.</p>
          </div>
          <div>
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
              placeholder="Search for spvs..."
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
          {user && user.infos && user.infos.is_super_admin && (
            <Grid item xs={4} className="mb-4">
              <Alert severity="success">
                As an admin, you can look for any spv.
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
                  {!results.length && <None text="No spvs found." />}
                  {results.length > 0 && (
                    <List headers={headers_tables['spvs']} data={results} />
                  )}
                </div>
              )}
              {!search && (
                <div>
                  {spvs.length < 1 && <None text="No spvs yet. Create one?" />}
                  {spvs.length > 0 && (
                    <List headers={headers_tables['spvs']} data={spvs} />
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
