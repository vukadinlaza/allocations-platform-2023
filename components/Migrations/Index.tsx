'use client';

import { Button, Card, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import List from '@/components/Loading/List';
import supabase from '@/lib/supabase';
import MigrationsList from '@/components/Migrations/List';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import None from '@/components/None';

export default function Migrations() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Array<any>>([]);
  const [migrationData, setMigrationData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const fetchMigrations = async () => {
    try {
      setLoading(true);

      let { data: migrations } = await supabase.from('migrations').select('*');

      if (migrations && migrations.length > 0) {
        setResults(migrations);
        setMigrationData(migrations);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMigrations();
  }, []);

  useEffect(() => {
    setResults(migrationData);
    if (search && search.length > 0) {
      const res = results.filter((x) => {
        if (x.name) {
          return x.name.includes(search);
        }
      });
      setResults(res);
    }
  }, [search]);

  return (
    <Card className="card" variant="outlined">
      <header>
        <div>
          <h1>Migrations</h1>
          <p>Manage your migrations.</p>
        </div>
        {/* <button
          className="btn primary"
          onClick={() => router.push('/migrations/new')}
        >
          Create new
        </button> */}
      </header>
      <div className="w-full">
        <TextField
          style={{ maxWidth: '400px' }}
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
          {!loading && !results.length && (
            <None text="No migrations deals found. Create one?" />
          )}
        </div>
      </div>
    </Card>
  );
}
