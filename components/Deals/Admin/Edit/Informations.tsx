import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import Upload from '@/components/Upload';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal, Field } from '@/types';
import { useState } from 'react';

export default function DealInformations({ deal }: { deal: Deal }) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(true);

  const model: Field[] = [
    {
      label: 'Asset type',
      key: 'asset_type',
      type: 'select',
      show: true,
      items: []
    },
    {
      label: 'Security type',
      key: 'security_type',
      type: 'select',
      show: true,
      items: []
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
      label: 'Management fee percent',
      key: 'management_fee_percent',
      type: 'number',
      show: true
    },
    {
      label: 'Management fee frequency',
      key: 'management_fee_frequency',
      type: 'select',
      show: true,
      items: []
    },
    {
      label: 'Total carry',
      key: 'total_carry',
      type: 'number',
      show: true
    }
  ];

  const saveDeal = async () => {
    if (!deal) return;
    try {
      setLoading(true);

      // const { data, error } = await supabase
      //   .from('deals')
      //   .upsert();

      // if (error) {
      //   notify(`Sorry, could not save organization.`, false);
      //   return;
      // }
      notify('Organization saved.', true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start border rounded card">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Complete deal informations</h2>
      </header>
      <main>
        <div className="w-full mb-6">
          <FormBuilder model={model} onSubmit={() => {}} />
          <div className="my-6">
            <Button
              loading={loading}
              onClick={saveDeal}
              label="Save informations"
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
            <h2 className="text-xl">Upload term sheet</h2>
            <p>Formats are jpg, jpeg, pdf & png. Max size: 25mb.</p>
          </div>
          <Upload />
        </div>
      </main>
    </div>
  );
}
