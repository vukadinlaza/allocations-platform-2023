import { Grid, TextField } from '@mui/material';

type Field = {
  key: string;
  label: string;
  type: 'string' | 'number' | 'email'; // add more types as needed
};

type Props = {
  items: Field[];
  onChange: (key: string, value: string) => void;
  loading: boolean;
};

export default function FormBuilder({ items, onChange, loading }: Props) {
  return (
    <Grid container spacing={2}>
      {items.map((field) => (
        <Grid item xs={12} key={field.key}>
          <p className="mb-2">{field.label || 'No label'}</p>
          {field.type === 'string' && field.key && (
            <TextField
              disabled={loading}
              size="small"
              variant="outlined"
              className="w-full"
              fullWidth
              onChange={(event) => onChange(field.key, event.target.value)}
            />
          )}
          {/* add more conditions for other field types as needed */}
        </Grid>
      ))}
    </Grid>
  );
}
