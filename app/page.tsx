'use client';

import LoadingButtons from '@/components/Loading/Buttons';
import LoadingList from '@/components/Loading/List';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useAuthContext } from './context';

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const getFullName = () => {
    if (!user) return '';
    if (user && user.first_name) return user.first_name;
    return user.email;
  };

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
            <h1 className="mb-4">Welcome back {getFullName()}!</h1>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      )}
    </Grid>
  );
}
