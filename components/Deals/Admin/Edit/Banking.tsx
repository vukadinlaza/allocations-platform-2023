import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';

import { deal_banking_providers } from '@/types/values';

export default function DealBanking({
  deal,
  onChange
}: {
  deal: Deal;
  onChange: (v: any) => any;
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
    <div className="w-full mb-2">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Chose a banking provider</h2>
      </header>
      <FormBuilder
        data={deal}
        model={model}
        emit={true}
        onSubmit={(v: any) => {
          onChange(v);
        }}
      />
    </div>
  );
}
