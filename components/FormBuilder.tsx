import Button from '@/components/Button';
import { Field } from '@/types';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CopyToClipboard from './Copy';
import None from './None';
import Select from './Select';

type Props = {
  model: Field[];
  onSubmit: (data: any) => void;
  loading?: boolean;
  emit?: boolean | false;
  data?: any;
  buttonLabel?: string;
};

export default function FormBuilder({
  model,
  loading,
  data,
  onSubmit,
  emit = false,
  buttonLabel
}: Props) {
  const [_data, setData] = useState<any>({});

  useEffect(() => {
    // TODO
    if (emit) {
      onSubmit(_data);
    }
  }, [_data]);

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <>
      {!model && !_data && (
        <None text="Sorry this content is not yet available." />
      )}
      {model && (
        <Grid container spacing={2} className="FormBuilder">
          {model.map((field) => {
            if (field.show) {
              return (
                <Grid item xs={12} key={field.key}>
                  <p className="mb-2">{field.label || 'No label'}</p>
                  <div className="flex items-end">
                    {field.type === 'string' && field.key && (
                      <input
                        type="text"
                        placeholder={field.placeholder || undefined}
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
                        selected={field.value || null}
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
                    {field.type === 'date' && field.key && (
                      <input
                        type="date"
                        disabled={loading || field.disabled}
                        className={`${loading ? 'disabled' : ''}`}
                        value={
                          _data && _data[field.key] ? _data[field.key] : ''
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData((prevData: any) => ({
                            ...prevData,
                            [field.key]: e.target.value
                          }))
                        }
                      />
                    )}
                    {field.type === 'number' && field.key && (
                      <input
                        type="number"
                        placeholder={field.placeholder || undefined}
                        disabled={loading || field.disabled}
                        className={`${loading ? 'disabled' : ''}`}
                        value={
                          _data && _data[field.key] ? _data[field.key] : ''
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;
                          const numericValue = parseFloat(inputValue);

                          if (!isNaN(numericValue)) {
                            setData((prevData: any) => ({
                              ...prevData,
                              [field.key]: numericValue
                            }));
                          }
                        }}
                      />
                    )}
                    {field.copy && (
                      <CopyToClipboard toCopy={_data[field.key]} />
                    )}
                  </div>
                </Grid>
              );
            }
          })}
          {buttonLabel && (
            <Grid item xs={12}>
              <Button
                loading={loading}
                disabled={loading}
                label={buttonLabel ? buttonLabel : 'Create'}
                onClick={() => onSubmit(_data)}
              />
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
