import Button from '@/components/Button';
import { Field } from '@/types';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Select from './Select';

type Props = {
  model: Field[];
  onSubmit: (data: any) => void;
  loading: boolean;
  data: any;
  buttonLabel?: string;
};

export default function FormBuilder({
  model,
  loading,
  data,
  onSubmit,
  buttonLabel
}: Props) {
  const [_data, setData] = useState<any>({});

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <Grid container spacing={2} className="FormBuilder">
      {model &&
        model.map((field) => {
          if (field.show) {
            return (
              <Grid item xs={12} key={field.key}>
                <p className="mb-2">{field.label || 'No label'}</p>
                {field.type === 'string' && field.key && (
                  <input
                    type="text"
                    disabled={loading || field.disabled}
                    className={`${loading ? 'disabled' : ''}`}
                    value={_data && [field.key] ? _data[field.key] : null}
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
      <Grid item xs={12}>
        <Button
          loading={loading}
          disabled={loading}
          label={buttonLabel ? buttonLabel : 'Create'}
          onClick={() => onSubmit(_data)}
        />
      </Grid>
    </Grid>
  );
}
