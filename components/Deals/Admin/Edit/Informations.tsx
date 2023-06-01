import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';
import UploadPitchdeck from './Upload/Pitchdeck';
import UploadTermSheets from './Upload/TermSheet';
import UploadWireInstructions from './Upload/WireInstructions';

export default function DealInformations({
  deal,
  onChange
}: {
  deal: Deal;
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
      show: true
    },
    {
      label: 'Minimum investment',
      key: 'minimum_investment',
      type: 'money',
      show: true
    },
    {
      label: 'Management fee percent',
      key: 'management_fee_percent',
      type: 'slider',
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
      show: true
    },
    // {
    //   label: 'Management fee frequency',
    //   key: 'management_fee_frequency',
    //   type: 'select',
    //   show: true,
    //   items: deal_management_frequency_fee
    // },
    {
      label: 'Total carry percent',
      key: 'total_carry',
      type: 'slider',
      unit: '%',
      step: 0.5,
      min: 0,
      max: 30,
      show: true
    },
    {
      label: 'Total carry note',
      key: 'total_carry_notes',
      type: 'string',
      show: true
    }
  ];

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Deal information</h2>
      </header>
      <main>
        {deal && (
          <div className="w-full mb-6">
            <FormBuilder
              data={deal}
              emit={true}
              model={model}
              onSubmit={(v: any) => {
                onChange(v);
              }}
            />
          </div>
        )}
        <UploadPitchdeck dealId={deal.id} />
        <UploadTermSheets dealId={deal.id} />
        <UploadWireInstructions dealId={deal.id} />
      </main>
    </div>
  );
}
