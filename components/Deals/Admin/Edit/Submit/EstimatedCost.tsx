import Price from '@/components/Price';
import { openURL } from '@/lib/utils';
import { Deal } from '@/types';
import { pricing } from '@/types/values';
import { useEffect, useState } from 'react';

export const getPricing = (selected: string) => {
  const item = pricing.find((p) => p.name === selected);
  if (!item) return;
  return (
    <div className="flex items-start justify-between w-full px-4 py-3 border rounded-lg cursor-pointer hover:bg-gray-50">
      <div>
        <h2 className="mb-0 text-lg font-medium">{item.name}</h2>
        <p>{item.description}</p>
      </div>
      <div className="text-base font-medium">
        <Price price={item.price} />
        <span className="text-primary-500">*</span>
      </div>
    </div>
  );
};
export default function EstimatedCosts({ deal }: { deal: Deal }) {
  const [selected, setSelected] = useState<any>(undefined);

  useEffect(() => {
    if (deal.sub_type) setSelected(deal.sub_type);
  }, [deal]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Estimated costs</h2>
      </header>
      {pricing && <div>{getPricing(selected)}</div>}
      <div className="mt-4">
        <p className="flex gap-1 text-sm">
          <span className="font-medium text-primary">*</span>
          <span>
            Please note that the price displayed is an estimated base cost and
            may vary depending on selected addons or additional options. You can
            also{' '}
            <span
              className="cta"
              onClick={() => openURL('https://allocations.com/fees', '_blank')}
            >
              view pricing here.
            </span>{' '}
            If you have any questions, please do not hesitate to reach out to
            <span className="ml-1 cta">sales@allocations.com</span>
          </span>
        </p>
      </div>
    </div>
  );
}
