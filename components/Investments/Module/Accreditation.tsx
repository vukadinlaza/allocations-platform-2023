import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import { useSupabase } from '@/lib/supabase-provider';
import { useState } from 'react';

export default function Accreditation({
  entity,
  onUpdate
}: {
  entity: any;
  onUpdate: (a: any) => void;
}) {
  const [accreditationType, setAccreditationType] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const options = [
    {
      label: 'Individual with net-worth of $1M+ (with or without spouse)',
      value: 'individual_net_worth'
    },
    {
      label:
        'Individual with annual income in last two years of $200k+ ($300k+ without spouse)',
      value: 'individual_annual_income'
    },
    {
      label:
        'Entity or trust not formed for the specific purpose of investing with $5M+ in assets',
      value: 'entity_no_specific_purpose'
    },
    {
      label:
        'FINRA-licensed individual in good standing with Series 7, 65 or 82',
      value: 'finra_licensed_individual'
    },
    {
      label:
        'Entity beneficially owned by all accredited investors by the standard above',
      value: 'entity_beneficially_owned'
    }
  ];

  const saveAccreditation = async () => {
    if (!accreditationType && !entity)
      alert('Please enter an accreditation type.');
    try {
      setLoading(true);
      const { data } = await supabase
        .from('accreditations')
        .insert({
          user_investment_entity_id: entity.id,
          value: accreditationType
        })
        .select();

      if (data && data.length > 0) {
        onUpdate(data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h2 className="text-lg font-bold">
          This investment opportunity is only available to accredited investors
        </h2>
        <p className="text-sm">
          You will need to verify your accreditation to participate in the sale.
        </p>
      </header>
      <main>
        <div className="mb-8">
          <h2>How are you accredited?</h2>
          <RadioGroup
            options={options}
            onChange={(v: string) => setAccreditationType(v)}
          ></RadioGroup>
          <p className="text-xs">
            If you believe you are qualified as an accredited investor for a
            reason not listed above, please reach out to{' '}
            <span className="text-primary-500">support@allocations.com</span> to
            clarify.
          </p>
        </div>
        <Button
          label={'Save'}
          loading={loading}
          disabled={!accreditationType}
          onClick={saveAccreditation}
        />
      </main>
    </div>
  );
}
