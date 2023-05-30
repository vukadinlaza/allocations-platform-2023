import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';

import { deal_banking_providers } from '@/types/values';

export default function DealBanking({
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
      label: 'Banking provider',
      key: 'banking_provider',
      type: 'select',
      show: true,
      items: deal_banking_providers
    }
  ];
  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Chose a banking provider</h2>
      </header>
      <FormBuilder
        data={deal}
        model={model}
        emit={true}
        onSubmit={(v: any) => {
          onChange({
            banking_provider: v.banking_provider
          });
        }}
      />
      <div className="mt-6">
        <Button loading={loading} onClick={onSave} label="Save" />
      </div>
    </div>
  );
}
