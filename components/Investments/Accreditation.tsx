import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import { useSupabase } from '@/lib/supabase-provider';
import { useState } from 'react';

export default function Accreditation({
  identityId,
  onUpdate
}: {
  identityId: any;
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
    if (!accreditationType) alert('Please enter an accreditation type.');
    try {
      setLoading(true);
      const { data } = await supabase
        .from('accreditations')
        .insert({
          identities_id: identityId,
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
        <h1 className="mb-2 text-lg font-medium">
          Select an accreditation for this profile
        </h1>
        <label className="text-sm">
          This investment opportunity is only available to accredited investors.
          You will need to verify your accreditation to participate in the sale.
        </label>
      </header>
      <main>
        <div className="mb-8">
          <h3 className="text-sm">How are you accredited?</h3>
          <div className="text-sm">
            <RadioGroup
              options={options}
              onChange={(v: string) => setAccreditationType(v)}
            ></RadioGroup>
          </div>
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
