import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';

export default function DealLegalDocuments({
  deal,
  onChange
}: {
  deal: Deal;
  onChange: (v: any) => any;
}) {
  const model: Field[] = [
    {
      label: 'Legal templates',
      key: 'legal_template_option',
      type: 'select',
      show: true,
      items: ['Allocations', 'other']
    }
  ];
  return (
    <div className="w-full mb-2">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Create legal documents</h2>
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
