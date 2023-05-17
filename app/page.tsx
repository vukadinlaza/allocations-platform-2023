'use client';

import LoadingButtons from '@/components/Loading/Buttons';
import LoadingList from '@/components/Loading/List';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from './context';
import { getFullName } from '@/lib/utils';

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  return (
    <Grid container className="home">
      {loading && (
        <div className="w-full">
          <LoadingButtons />
          <LoadingList />
        </div>
      )}
      {!loading && (
        <Grid item xs={12}>
          <Grid item xs={12}>
            <h1 className="mb-4">Welcome back {getFullName(user)}!</h1>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      )}
    </Grid>
  );
}
