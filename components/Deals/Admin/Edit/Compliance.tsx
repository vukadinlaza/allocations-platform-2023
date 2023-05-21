import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';

import { deal_offering_types } from '@/types/values';

export default function DealCompliance({
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
      label: 'Offering type',
      key: 'offering_type',
      type: 'select',
      show: true,
      items: deal_offering_types
    },
    {
      label: 'Advisor',
      key: 'advisor',
      type: 'select',
      show: true,
      items: ['Allocations Advisers LLC (default)', 'Other']
    }
  ];
  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Compliance</h2>
      </header>
      <FormBuilder
        data={deal}
        model={model}
        emit={true}
        onSubmit={(v: any) => {
          // onChange(v);
        }}
      />
      <div className="mt-6">
        <Button loading={loading} onClick={onSave} label="Save" />
      </div>
    </div>
  );
}
