import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { Deal, Field } from '@/types';

export default function DealLegalDocuments({
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
      label: 'Legal templates',
      key: 'legal_templates',
      type: 'select',
      show: true,
      items: []
    }
  ];
  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Create legal documents</h2>
      </header>
      <FormBuilder
        data={deal}
        model={model}
        emit={true}
        onSubmit={(v: any) => {
          // onChange(v);
        }}
      />
      <div className="mt-6">
        <Button loading={loading} onClick={onSave} label="Create" />
      </div>
    </div>
  );
}
