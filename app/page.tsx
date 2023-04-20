'use client';

import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Migrations() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchOrganizations = () => {
    try {
    } catch (err) {
    } finally {
    }
  };

  const handleChange = () => {};

  useEffect(() => {
    fetchOrganizations();
  }, []);
  return (
    <div>
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
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
