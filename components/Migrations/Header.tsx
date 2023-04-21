'use client';

import { Button, Card, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function MigrationsHeader() {
  return (
    <Card className="card" variant="outlined">
      <header className="flex items-start justify-between w-full mb-8">
        <div>
          <h2>Migrations</h2>
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </div>
    </Card>
  );
}
