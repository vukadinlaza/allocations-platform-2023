import Button from '@/components/Button';
import { Field } from '@/types';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MultiSelect from './Multiselect';
import None from './None';
import Select from './Select';

type Props = {
  model: Field[];
  onSubmit: (data: any) => void;
  onSave?: () => void;
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
  onSave,
  emit = false,
  buttonLabel
}: Props) {
  const [_data, setData] = useState<any>({});

  useEffect(() => {
    if (emit) {
      onSubmit(_data);
    }
  }, [_data]);

  useEffect(() => {
    if (data && Object.keys(_data).length === 0) {
      setData(data);
    }
  }, [model, data]);

  return (
    <>
      {!model && !_data && <None text="Sorry this content is not available." />}
      {model && (
        <Grid container spacing={2} className="FormBuilder">
          {model.map((field) => {
            if (field.show) {
              return (
                <Grid item xs={12} key={field.key}>
                  <label>{field.label || 'No label'}</label>
                  <div className="flex items-center gap-2">
                    {field.type === 'string' && (
                      <input
                        type="text"
                        max={field.limit}
                        placeholder={field.placeholder || undefined}
                        disabled={loading || field.disabled}
                        className={`${loading ? 'disabled' : ''}`}
                        value={
                          // @ts-ignore
                          _data && _data[field.key] ? _data[field.key] : ''
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData((prevData: any) => ({
                            ...prevData,
                            // @ts-ignore
                            [field.key]: e.target.value
                          }))
                        }
                      />
                    )}
                    {field.type === 'select' && field.items && field.key && (
                      <Select
                        disabled={field.disabled}
                        selected={_data && [field.key] ? _data[field.key] : ''}
                        displayLabel={(v) => v}
                        items={field.items}
                        onChange={(e) => {
                          setData((prevData: any) => ({
                            ...prevData,
                            // @ts-ignore
                            [field.key]: e
                          }));
                        }}
                      ></Select>
                    )}

                    {field.type === 'multiselect' &&
                      field.items &&
                      field.key && (
                        <MultiSelect
                          selected={
                            _data && [field.key] ? _data[field.key] : ''
                          }
                          displayLabel={(v) => v}
                          items={field.items}
                          onChange={(e) => {
                            setData((prevData: any) => ({
                              ...prevData,
                              // @ts-ignore
                              [field.key]: e
                            }));
                          }}
                        ></MultiSelect>
                      )}
                    {field.type === 'date' && field.key && (
                      <input
                        type="date"
                        disabled={loading || field.disabled}
                        className={`${loading ? 'disabled' : ''}`}
                        value={
                          _data && _data[field.key]
                            ? dayjs(_data[field.key]).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setData((prevData: any) => ({
                            ...prevData,
                            // @ts-ignore
                            [field.key]: e.target.value
                          }))
                        }
                      />
                    )}
                    {field.type === 'slider' && field.key && (
                      <div className="flex items-center justify-between w-80">
                        <Slider
                          value={
                            _data && _data[field.key] ? _data[field.key] : 0
                          }
                          step={field.step}
                          placeholder={field.placeholder || undefined}
                          min={field.min}
                          max={field.max}
                          disabled={loading || field.disabled}
                          className={`${loading ? 'disabled' : ''}`}
                          onChange={(e: Event) =>
                            setData((prevData: any) => ({
                              ...prevData,
                              // @ts-ignore
                              [field.key]: e.target.value
                            }))
                          }
                        />
                        <div className="flex w-12 ml-6">
                          <p className="w-8">
                            {_data && _data[field.key] ? _data[field.key] : 0}
                          </p>
                          <p className="w-4 ml-1">{field.unit}</p>
                        </div>
                      </div>
                    )}
                    {field.type === 'number' && field.key && (
                      <input
                        type="number"
                        placeholder={field.placeholder || undefined}
                        min={field.min}
                        max={field.max}
                        disabled={loading || field.disabled}
                        className={`${loading ? 'disabled' : ''}`}
                        value={_data && _data[field.key] ? _data[field.key] : 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;
                          const numericValue = parseFloat(inputValue);

                          if (!isNaN(numericValue)) {
                            setData((prevData: any) => ({
                              ...prevData,
                              // @ts-ignore
                              [field.key]: numericValue
                            }));
                          }
                        }}
                      />
                    )}
                    {field.type === 'money' && field.key && (
                      <div className="flex items-center w-full mr-2 overflow-hidden border rounded">
                        <div className="px-3 py-2 mr-2 font-medium bg-gray-100">
                          $
                        </div>
                        <input
                          type="text"
                          placeholder={field.placeholder || undefined}
                          disabled={loading || field.disabled}
                          className={`money ${
                            loading ? 'disabled' : ''
                          } border-0 w-full outline-none focus:outline-none ring-0`}
                          value={
                            _data && _data[field.key] ? _data[field.key] : 0
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const inputValue = parseFloat(e.target.value);
                            if (!isNaN(inputValue)) {
                              setData((prevData: any) => ({
                                ...prevData,
                                // @ts-ignore
                                [field.key]: parseFloat(e.target.value)
                              }));
                            } else {
                              setData((prevData: any) => ({
                                ...prevData,
                                // @ts-ignore
                                [field.key]: 0
                              }));
                            }
                          }}
                        />
                      </div>
                    )}
                    {field.save && (
                      <Button
                        loading={loading}
                        disabled={loading}
                        label={'Save'}
                        onClick={() => {
                          if (onSave) onSave();
                        }}
                      />
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
