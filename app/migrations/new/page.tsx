'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, TextField, Grid, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { Migration } from '@/types';
import supabase from '@/lib/supabase';

interface ModelItem {
  key: keyof Migration;
  label: string;
}

interface Status {
  type: string;
  message: string;
}

export default function NewMigration() {
  const [form, setForm] = useState<Migration>({
    // legal_entity_id: '4bbec2e2-dfae-11ed-8d22-acde48001122',
    // organization_id: '639992e87e680cc36458e910'
  });
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = model.every((item) => form[item.key]);
    if (!isFormValid) {
      alert('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('migrations')
        .insert(form)
        .single();

      if (!error) {
        setStatus({
          type: 'success',
          message:
            'Success, migration saved. Redirecting now to migrations list.'
        });
      }
    } catch (error) {
      // TODO: deal with error here later.
      setStatus({
        type: 'error',
        message: 'Sorry, an error occured. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (status) {
        setStatus(null);
        if (status.type === 'success') {
          router.push('/migrations');
        }
      }
    }, 3000);
  }, [status]);

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
                  disabled={loading}
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
        <div className="my-4">
          {status && (
            <div className="mb-4">
              <Alert severity={status.type}>{status.message}</Alert>
            </div>
          )}
          {!status && (
            <div className="flex items-center justify-left">
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                color="primary"
                className="mr-2 primary"
                disableElevation
              >
                {loading ? 'Saving...' : 'Save'}
              </LoadingButton>
              {!loading && (
                <LoadingButton
                  onClick={() => router.push('/migrations')}
                  loading={loading}
                  variant="outlined"
                  color="primary"
                >
                  {loading ? 'Saving...' : 'Cancel'}
                </LoadingButton>
              )}
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
