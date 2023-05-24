import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import { openURL } from '@/components/Table';
import { Deal } from '@/types';
import { deal_product_types } from '@/types/values';
import { useEffect, useState } from 'react';

export default function DealProductType({
  deal,
  onSave,
  onChange,
  loading
}: {
  deal: Deal;
  onSave: () => any;
  onChange: (v: any) => any;
  loading?: boolean;
}) {
  const [productType, setProductType] = useState(deal_product_types[0]);

  useEffect(() => {
    onChange(productType);
  }, [productType]);
  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Product type</h2>
      </header>
      <RadioGroup
        selected={productType}
        options={deal_product_types.map((x) => ({ value: x, label: x }))}
        onChange={(v: string) => setProductType(v)}
      ></RadioGroup>
      <div>
        <span
          className="cta"
          onClick={() => openURL('https://allocations.com/fees')}
        >
          View pricing
        </span>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button loading={loading} onClick={() => onSave()} label="Save" />
      </div>
    </div>
  );
}
