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
import List from '@/components/Loading/List';

export default function Migrations() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <Grid container>
      {loading && <List />}
      {!loading && (
        <Grid item xs={12}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select an organization...
              </InputLabel>
              <Select
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
            <Card className="p-6" variant="outlined">
              There are no deals.
            </Card>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
