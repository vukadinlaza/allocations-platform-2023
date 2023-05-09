import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

type FieldType = 'string' | 'number' | 'email';

export type Field = {
  key: string;
  label: string;
  type: FieldType; // add more types as needed
};

type Props = {
  model: Field[];
  onChange: (data: any) => void;
  loading?: boolean;
  data: any;
};

export default function FormBuilder({ model, loading, onChange, data }: Props) {
  const [_data, setData] = useState<any>({});

  useEffect(() => {
    onChange(_data);
  }, [_data]);

  useEffect(() => {
    if (data) {
      setData(data);
    }
    return () => {
      setData({});
    };
  }, []);

  return (
    <Grid container spacing={2} className="FormBuilder">
      {model.map((field) => (
        <Grid item xs={12} key={field.key}>
          <p className="mb-2">{field.label || 'No label'}</p>
          {field.type === 'string' && field.key && (
            <TextField
              disabled={loading}
              size="small"
              variant="outlined"
              fullWidth
              value={_data[field.key]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData((prevData: any) => ({
                  ...prevData,
                  [field.key]: e.target.value
                }))
              }
            />
          )}
          {/* add more conditions for other field types as needed */}
        </Grid>
      ))}
    </Grid>
  );
}
