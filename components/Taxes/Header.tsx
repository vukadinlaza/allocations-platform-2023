'use client';

import { Button, Card, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import List from '../Loading/List';
import supabase from '@/lib/supabase';
import TaxesList from './List';
import Image from 'next/image';

export default function TaxesHeader() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTaxes = async () => {
    try {
      setLoading(true);

      let { data: taxes } = await supabase
        .from('tax_1065s')
        .select('*')
        .textSearch('deal_name', search);

      console.log(taxes);

      if (taxes && taxes.length > 0) {
        console.log(taxes);
        setResults(taxes);
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
        setResults([]);
        fetchTaxes();
      }, 1000);
      return () => clearTimeout(_search);
    }
    setResults([]);
  }, [search]);

  return (
    <Card className="card" variant="outlined">
      <header className="flex items-start justify-between w-full mb-8">
        <div>
          <h1>Taxes</h1>
          <p>Manage your taxes.</p>
        </div>
        <Button variant="text" className="primary" disableElevation>
          Create new
        </Button>
      </header>
      <div className="w-full">
        <TextField
          size="small"
          className="w-full"
          placeholder="Search for a tax..."
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
          {!loading && results.length > 0 && <TaxesList data={results} />}
          {!loading && !results.length && (
            <Card className="card" variant="outlined">
              <Image
                src="/empty_target.svg"
                className="mb-4"
                width={75}
                height={75}
              />
              <p>No tax record found.</p>
            </Card>
          )}
        </div>
      </div>
    </Card>
  );
}
