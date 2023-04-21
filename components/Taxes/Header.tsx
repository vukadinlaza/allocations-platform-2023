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
  const [taxesData, setTaxesData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTaxes = async () => {
    try {
      setLoading(true);

      let { data: taxes } = await supabase
        .from('tax_1065s')
        .select('*')
        .limit(10);

      console.log(taxes);

      if (taxes && taxes.length > 0) {
        console.log(taxes);
        setResults(taxes);
        setTaxesData(taxes);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaxes();
  }, []);

  useEffect(() => {
    setResults(taxesData);
    if (search && search.length > 0) {
      const res = results.filter((x) => {
        if (x.deal_name) {
          return x.deal_name.includes(search);
        }
      });
      setResults(res);
    }
  }, [search]);

  return (
    <Card className="card" variant="outlined">
      <header className="flex items-start justify-between w-full mb-8">
        <div>
          <h1>Taxes</h1>
          <p>Manage your tax returns.</p>
        </div>
        <Button variant="contained" disableElevation>
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
