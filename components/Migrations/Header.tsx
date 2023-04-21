'use client';

import { Button, Card, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import List from '../Loading/List';
import supabase from '@/lib/supabase';
import MigrationsList from './List';

export default function MigrationsHeader() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMigrations = async () => {
    try {
      setLoading(true);

      let { data: migrations } = await supabase
        .from('deals_legal_entities')
        .select('*')
        .textSearch('name', search);

      if (migrations && migrations.length > 0) {
        setResults(migrations);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search && search.length > 0) {
      const _search = setTimeout(() => {
        fetchMigrations();
      }, 1000);
      return () => clearTimeout(_search);
    }
  }, [search]);

  return (
    <Card className="card" variant="outlined">
      <header className="flex items-start justify-between w-full mb-8">
        <div>
          <h1>Migrations</h1>
          <p>Manage your migrations.</p>
        </div>
        <Button variant="contained" className="primary" disableElevation>
          Create new
        </Button>
      </header>
      <div className="w-full">
        <TextField
          size="small"
          className="w-full"
          placeholder="Search for a migration..."
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
        <div className="mt-8 results">
          {loading && <List />}
          {!loading && results.length > 0 && <MigrationsList data={results} />}
        </div>
      </div>
    </Card>
  );
}
