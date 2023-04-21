'use client';

import { Search } from '@mui/icons-material';
import { Card, InputAdornment, TextField } from '@mui/material';

export default function Autocomplete({ selected, setSearch, results }) {
  return (
    <div>
      <TextField
        className="w-full"
        placeholder="Search for an organization..."
        onInput={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
    </div>
  );
}
