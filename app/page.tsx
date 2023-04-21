'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import supabase from '@/lib/supabase';
import LoadingButtons from '@/components/Loading/Buttons';
import LoadingList from '@/components/Loading/List';
import Image from 'next/image';
import Autocomplete from '@/components/Autocomplete';
import DataTable from '@/components/DataTable';

export default function Dashboard() {
  const [deals, setDeals] = useState([]);
  const [dealsLoading, setDealsLoading] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      let { data: _organizations } = await supabase
        .from('Organizations')
        .select('*')
        .order('name');

      if (_organizations && _organizations.length > 0) {
        setOrganizations(_organizations);
        setSelected(_organizations[0].name);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    try {
      setDealsLoading(true);
      let { data: _deals } = await supabase
        .from('deals_legal_entities')
        .select('*')
        .eq('name', selected)
        .limit(limit);

      if (_deals && _deals.length > 0) {
        setDeals(_deals);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDealsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [selected]);

  // useEffect(() => {
  //   const _search = setTimeout(() => {
  //     fetchOrganizations();
  //   }, 1000);
  //   return () => clearTimeout(_search);
  // }, [search]);

  return (
    <Grid container>
      {loading && (
        <div className="w-full">
          <LoadingButtons />
          <LoadingList />
        </div>
      )}
      {!loading && (
        <Grid item xs={12}>
          <Grid item xs={4} className="mb-4">
            {/* <Autocomplete
              selected={selected}
              setSearch={setSearch}
              results={organizations}
            /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select an organization...
              </InputLabel>
              <Select
                className="mb-2"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="Age"
                onChange={handleChange}
              >
                {organizations.length > 0 &&
                  organizations.map((o) => (
                    <MenuItem value={o.name}>{o.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} className="my-4">
            {dealsLoading && <LoadingList />}
            {!dealsLoading && deals.length === 0 && (
              <Card className="card" variant="outlined">
                <Image
                  src="/empty_target.svg"
                  className="mb-4"
                  width={75}
                  height={75}
                />
                <p>No deals recorded for {selected}.</p>
              </Card>
            )}
            {!dealsLoading && deals.length > 1 && <DataTable data={deals} />}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
