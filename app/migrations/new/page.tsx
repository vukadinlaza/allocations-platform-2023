'use client';

import React, { useState } from 'react';
import { Card, TextField, Grid } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { Migration } from '@/types';

interface ModelItem {
  key: keyof Migration;
  label: string;
}

export default function NewMigration() {
  const [form, setForm] = useState<Migration>({});
  const [loading, setLoading] = useState(false);

  const model: ModelItem[] = [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'legal_entity_id',
      label: 'Legal Entity ID'
    },
    {
      key: 'organization_id',
      label: 'Organization ID'
    },
    {
      key: 'ein',
      label: 'EIN'
    },
    {
      key: 'organization_name',
      label: 'Organization Name'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const isFormValid = model.every((item) => form[item.key]);
    if (!isFormValid) {
      alert('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Perform form submission logic here
  };

  return (
    <Card className="card">
      <header>
        <div>
          <h1>New migration</h1>
          <p>Create a new migration.</p>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {model.map((item) => (
            <React.Fragment key={item.key}>
              <Grid item xs={12} sm={4}>
                <label>{item.label}</label>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name={item.key}
                  label={item.label}
                  value={form[item.key] || ''}
                  onChange={handleInputChange}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Grid className="my-4" xs={12} spacing={2}>
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            disableElevation
          >
            {loading ? 'Saving...' : 'Save'}
          </LoadingButton>
          <LoadingButton loading={loading} variant="outlined" color="primary">
            {loading ? 'Saving...' : 'Cancel'}
          </LoadingButton>
        </Grid>
      </form>
    </Card>
  );
}
