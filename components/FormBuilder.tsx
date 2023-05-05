import { Grid, TextField } from '@mui/material';
import { useState } from 'react';

type Field = {
  key: string;
  label: string;
  type: 'string' | 'number' | 'email'; // add more types as needed
};

type Props = {
  items: Field[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  loading: boolean;
};

export default function FormBuilder({
  items,
  values,
  onChange,
  loading
}: Props) {
  return (
    <Grid container spacing={2}>
      {items.map((field) => (
        <Grid item xs={12} key={field.key}>
          {field.type === 'string' && (
            <TextField
              disabled={loading}
              size="small"
              label={field.label}
              variant="outlined"
              fullWidth
              value={values[field.key] || ''}
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          )}
          {/* add more conditions for other field types as needed */}
        </Grid>
      ))}
    </Grid>
  );
}
