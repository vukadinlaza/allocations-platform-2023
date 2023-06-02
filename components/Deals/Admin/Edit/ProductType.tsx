import RadioGroup from '@/components/RadioGroup';
import { openURL } from '@/components/Table';
import { Deal } from '@/types';
import { deal_product_types } from '@/types/values';
import { useEffect, useState } from 'react';

export default function DealProductType({
  deal,
  onChange,
  selected
}: {
  deal: Deal;
  onChange: (v: any) => any;
  selected?: string;
}) {
  const [productType, setProductType] = useState<string | undefined>(
    deal_product_types[0]
  );

  useEffect(() => {
    onChange(productType);
  }, [productType]);

  useEffect(() => {
    if (!productType) {
      setProductType(selected);
    }
  }, [selected]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-6">
        <h2 className="text-xl">Product type</h2>
      </header>
      <RadioGroup
        selected={productType ? productType : null}
        options={deal_product_types.map((x) => ({ value: x, label: x }))}
        onChange={(v: string) => setProductType(v)}
      ></RadioGroup>
      <div>
        <span
          className="cta"
          onClick={() => openURL('https://allocations.com/fees', '_blank')}
        >
          View pricing
        </span>
      </div>
    </div>
  );
}
