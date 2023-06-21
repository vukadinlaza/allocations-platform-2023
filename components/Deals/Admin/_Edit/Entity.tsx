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
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Select a master series</h2>
      </header>
      <FormBuilder
        data={deal}
        model={model}
        emit={true}
        onSubmit={(v: any) => {
          onChange({
            master_series: v.master_series,
            series_name: v.series_name
          });
        }}
      />
    </div>
  );
}
