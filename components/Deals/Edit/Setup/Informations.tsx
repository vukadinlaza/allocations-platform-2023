import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';
import { deal_management_frequency_fee } from '@/types/values';

export const keys = [
  'name',
  'closing_date',
  'target_raise_goal',
  'minimum_investment',
  'management_fee_percent',
  'management_fee_notes',
  'management_fee_frequency',
  'total_carry',
  'total_carry_notes'
];

export default function DealInformations({
  deal,
  disabled,
  onChange,
  onSave
}: {
  deal: Deal;
  disabled?: boolean | false;
  onSave?: () => any;
  onChange: (v: any) => any;
}) {
  const model: Field[] = [
    {
      label: 'Deal name',
      key: 'name',
      type: 'string',
      show: true
    },
    {
      label: 'Estimated closing date',
      key: 'closing_date',
      type: 'date',
      show: true
    },
    {
      label: 'Target raise amount',
      key: 'target_raise_goal',
      type: 'money',
      disabled: disabled,
      show: true
    },
    {
      label: 'Minimum investment',
      key: 'minimum_investment',
      type: 'money',
      disabled: disabled,
      show: true
    },
    {
      label: 'Management fee percent',
      key: 'management_fee_percent',
      type: 'slider',
      disabled: disabled,
      unit: '%',
      step: 0.5,
      min: 0,
      max: 10,
      show: true
    },
    {
      label: 'Management fee note',
      key: 'management_fee_notes',
      type: 'string',
      disabled: disabled,
      show: true
    },
    {
      label: 'Management fee frequency',
      key: 'management_fee_frequency',
      type: 'select',
      disabled: disabled,
      show: true,
      items: deal_management_frequency_fee
    },
    {
      label: 'Total carry percent',
      key: 'total_carry',
      type: 'slider',
      unit: '%',
      step: 0.5,
      min: 0,
      max: 30,
      disabled: disabled,
      show: true
    },
    {
      label: 'Total carry note',
      key: 'total_carry_notes',
      type: 'string',
      disabled: disabled,
      show: true
    }
  ];

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Information</h2>
      </header>
      <main>
        {deal && (
          <div className="w-full mb-6">
            <FormBuilder
              data={deal}
              emit={true}
              model={model}
              onSave={() => {
                if (onSave) onSave();
              }}
              onSubmit={(v: any) => {
                onChange(v);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
