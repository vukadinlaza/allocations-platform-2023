import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';
import { deal_master_series } from '@/types/values';

export default function DealEntity({
  deal,
  onSave,
  onChange,
  loading
}: {
  deal: Deal;
  onSave: () => any;
  onChange: (v: any) => any;
  loading: boolean;
}) {
  const model: Field[] = [
    {
      label: 'Master series',
      key: 'master_series',
      type: 'select',
      show: true,
      items: deal_master_series
    },
    {
      label: 'Series name',
      key: 'series_name',
      type: 'string',
      show: true
    }
  ];
  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Select an entity deal</h2>
      </header>
      <FormBuilder
        data={deal}
        model={model}
        emit={true}
        onSubmit={(v: any) => {
          onChange(v);
        }}
      />
      <div className="mt-6">
        <Button loading={loading} onClick={onSave} label="Save" />
      </div>
    </div>
  );
}
