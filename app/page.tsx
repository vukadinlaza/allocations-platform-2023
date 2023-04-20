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

export default function Migrations() {
  const [loading, setLoading] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState([]);
  const [dealsLoading, setDealsLoading] = useState<boolean>(true);
  const [deals, setDeals] = useState([]);
  const [selected, setSelected] = useState<string | null>(null);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      let { data: orgs } = await supabase
        .from('Organizations')
        .select('*')
        .order('name');

      if (orgs && orgs.length > 0) {
        const sorted = orgs;
        setOrganizations(orgs);
        setSelected(orgs[0].name);
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
        .eq('name', selected);

      console.log(selected);

      console.log(_deals);

      if (_deals && _deals.length > 0) {
        console.log(_deals);
        // const sorted = orgs;
        // setOrganizations(orgs);
        // setSelected(orgs[0].name);
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
              <Card
                className="flex flex-col items-center justify-center p-8 my-4"
                variant="outlined"
              >
                <Image
                  src="/empty_target.svg"
                  className="mb-4"
                  width={75}
                  height={75}
                />
                <p>No deals recorded for {selected}.</p>
              </Card>
            )}
            {!dealsLoading && deals.length > 1 && <p>hello</p>}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
