import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import Upload from '@/components/Upload';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal, Field } from '@/types';
import { deal_management_frequency_fee } from '@/types/values';
import { useState } from 'react';

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
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();

  const [_loading, setLoading] = useState<boolean>(false);

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
      type: 'number',
      show: true
    },
    {
      label: 'Minimum investment',
      key: 'minimum_investment',
      type: 'number',
      show: true
    },
    {
      label: 'Management fee percent (max. 100%)',
      key: 'management_fee_percent',
      type: 'number',
      min: 0,
      max: 100,
      show: true
    },
    {
      label: 'Management fee frequency',
      key: 'management_fee_frequency',
      type: 'select',
      show: true,
      items: deal_management_frequency_fee
    },
    {
      label: 'Total carry percent (max. 100%)',
      key: 'total_carry',
      type: 'number',
      min: 0,
      max: 100,
      show: true
    }
  ];

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Deal information</h2>
      </header>
      <main>
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
            <Button
              loading={loading || _loading}
              onClick={onSave}
              label="Save"
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl">Upload pitch deck</h2>
            <p>Formats are jpg, jpeg, pdf & png. Max size: 25mb.</p>
          </div>
          <Upload />
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl">Upload term sheet / purchase agreement</h2>
            <p>Formats are jpg, jpeg, pdf & png. Max size: 25mb.</p>
          </div>
          <Upload />
        </div>
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl">
              Upload portfolio company wire instructions
            </h2>
            <p>Formats are jpg, jpeg, pdf & png. Max size: 25mb.</p>
          </div>
          <Upload />
        </div>
      </main>
    </div>
  );
}
