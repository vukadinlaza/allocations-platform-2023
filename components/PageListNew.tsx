'use client';
import { useAuthContext } from '@/app/context';
import { Search } from '@mui/icons-material';
import { Alert, Card, Grid, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import List from './List';

export default function PageListNew({
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
    if (search) {
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
    <main>
      {data && (
        <Card className="card" variant="outlined">
          {header && (
            <header>
              <div>
                <h1 className="mb-2">
                  <span className="mr-2">{header.name || 'No title'}</span>
                  <div className="chip chip--small chip--info">
                    {data.length || 0}
                  </div>
                </h1>
                <p>{header.description || 'No description'}</p>
              </div>
              <div>
                {header.buttons &&
                  header.buttons.map((button: any) => (
                    <button
                      key={button.title}
                      disabled={button.disabled}
                      className="btn primary"
                      onClick={() => {
                        if (!button.action) return;
                        button.action();
                      }}
                    >
                      {button.title}
                    </button>
                  ))}
              </div>
            </header>
          )}
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
        </Card>
      )}
    </main>
  );
}
