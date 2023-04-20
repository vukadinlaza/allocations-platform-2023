'use client';
import { Grid } from '@mui/material';
import Line from './Line';

export default function List() {
  return (
    <Grid className="w-full" container spacing={1}>
      <Grid item xs={4}>
        <Line />
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={2}>
        <Line />
      </Grid>
      {Array.from({ length: 6 }).map((x, i) => (
        <Grid item xs={12} key={i}>
          <Line />
        </Grid>
      ))}
    </Grid>
  );
}
