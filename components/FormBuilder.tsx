import { Field } from '@/types';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Select from './Select';

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
      {model.map((field) => {
        if (field.show) {
          return (
            <Grid item xs={12} key={field.key}>
              <p className="mb-2">{field.label || 'No label'}</p>
              {field.type === 'string' && field.key && (
                <input
                  type="text"
                  disabled={loading || field.disabled}
                  className={`${loading ? 'disabled' : ''}`}
                  value={_data[field.key]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData((prevData: any) => ({
                      ...prevData,
                      [field.key]: e.target.value
                    }))
                  }
                />
              )}
              {field.type === 'select' && field.items && field.key && (
                <Select
                  selected={_data[field.key]}
                  displayLabel={(v) => v}
                  items={field.items}
                  onChange={(e) => {
                    setData((prevData: any) => ({
                      ...prevData,
                      [field.key]: e
                    }));
                  }}
                ></Select>
              )}
            </Grid>
          );
        }
      })}
    </Grid>
  );
}
