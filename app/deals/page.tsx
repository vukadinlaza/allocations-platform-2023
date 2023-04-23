'use client';

import { useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { Card, Grid } from '@mui/material';
import LoadingList from '@/components/Loading/List';
import { useAuthContext } from '@/app/context';
import None from '@/components/None';
import Entities from '@/components/Entities/Index';

// Todo - update everything for Deals

export default function Deals() {
  const [entitiesData, setEntitiesData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
<main>
      <Card className="card" variant="outlined">
        <header className="flex items-start justify-between w-full mb-8">
          <div>
            <h1>Deals</h1>
            <p>Manage your deals.</p>
          </div>
          <div className="flex items-center">
            <button className="btn primary">Create new</button>
          </div>
        </header>
        <Grid container>
          {loading && (
            <Grid item xs={12} className="w-full">
              <LoadingList />
            </Grid>
          )}
          {!loading && !entitiesData.length && (
            <Grid item xs={12} className="w-full">
              <None text="No deals yet. Create one?" />
            </Grid>
          )}
          {!loading && entitiesData.length > 0 && (
            <Grid item xs={12}>
              <Entities />
            </Grid>
          )}
        </Grid>
      </Card>
    </main>
  );
}
