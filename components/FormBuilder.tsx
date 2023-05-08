import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

type Field = {
  key: string;
  label: string;
  type: 'string' | 'number' | 'email'; // add more types as needed
};

type Props = {
  items: Field[];
  onChange: (data: any) => void;
  loading: boolean;
  model: any;
};

export default function FormBuilder({
  items,
  loading,
  onChange,
  model
}: Props) {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    onChange(data);
  }, [data]);

  useEffect(() => {
    if (model) {
      setData(model);
    }
    return () => {
      setData({});
    };
  }, []);

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
              value={data[field.key]}
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
