import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';
import { deal_management_frequency_fee } from '@/types/values';

export default function DealInformations({
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
            <div className="my-6">
              <Button loading={loading} onClick={onSave} label="Save" />
            </div>
          </div>
        )}
        {/*<div className="mb-6">*/}
        {/*  <div className="mb-4">*/}
        {/*    <h2 className="text-xl">Upload pitch deck</h2>*/}
        {/*    <p>Formats are jpg, jpeg, pdf & png. Max size: 25mb.</p>*/}
        {/*  </div>*/}
        {/*  <Upload />*/}
        {/*</div>*/}
        {/*<div className="mb-6">*/}
        {/*  <div className="mb-4">*/}
        {/*    <h2 className="text-xl">Upload term sheet / purchase agreement</h2>*/}
        {/*    <p>Formats are jpg, jpeg, pdf & png. Max size: 25mb.</p>*/}
        {/*  </div>*/}
        {/*  <Upload />*/}
        {/*</div>*/}
        {/*<div className="mb-6">*/}
        {/*  <div className="mb-4">*/}
        {/*    <h2 className="text-xl">*/}
        {/*      Upload portfolio company wire instructions*/}
        {/*    </h2>*/}
        {/*    <p>Formats are jpg, jpeg, pdf & png. Max size: 25mb.</p>*/}
        {/*  </div>*/}
        {/*  <Upload />*/}
        {/*</div>*/}
      </main>
    </div>
  );
}
