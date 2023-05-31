import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';
import { deal_master_series } from '@/types/values';

export default function DealEntity({
  deal,
  onChange
}: {
  deal: Deal;
  onChange: (v: any) => any;
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
    </div>
  );
}
