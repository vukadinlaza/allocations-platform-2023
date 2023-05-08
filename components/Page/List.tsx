'use client';
import { useAuthContext } from '@/app/context';
import List from '@/components/List';
import { Search } from '@mui/icons-material';
import { Alert, Grid, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function PageList({
  header,
  headersTable,
  data,
  type
}: {
  header?: any;
  headersTable?: any;
  data?: any;
  type?: string;
}) {
  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<Array<any>>([]);

  const { user } = useAuthContext();

  useEffect(() => {
    if (search && initialData.length > 0) {
      const filteredResults = initialData.filter((x) => {
        const values = Object.values(x);
        return values.some((value: any) => {
          if (value === null) {
            return false;
          }

          if (typeof value === 'boolean') {
            return false;
          }

          return value?.includes(search ?? '');
        });
      });
      setResults(filteredResults);
      return;
    }
    setResults([]);
  }, [search]);

  useEffect(() => {
    if (data) {
      setInitialData(data);
    }
  }, []);

  return (
    <main className="w-full">
      {data && user && (
        <div className="w-full">
          <Grid container xs={12} className="mb-6">
            <Grid item xs={8}>
              <TextField
                id="outlined-start-adornment"
                size="small"
                placeholder={'Search...'}
                sx={{ width: '300px' }}
                onInput={(e: any) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            {user && user.is_super_admin && (
              <Grid item xs={4} className="mb-4">
                <Alert severity="success">
                  As an admin, you can look & edit.
                </Alert>
              </Grid>
            )}
          </Grid>
          <Grid container>
            {!search && (
              <List type={type} headers={headersTable} data={initialData} />
            )}
            {search && (
              <List type={type} headers={headersTable} data={results} />
            )}
          </Grid>
        </div>
      )}
    </main>
  );
}
