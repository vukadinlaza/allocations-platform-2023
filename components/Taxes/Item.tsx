'use client';

import { getFirstLetter, limitString } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import ChipStatus from '../ChipStatus';

export default function TaxesItem({ tax }: { tax: any }) {
  const [loading, setLoading] = useState(false);

  console.log(tax);
  return (
    <div className="grid grid-cols-8 gap-2 item">
      <div className="flex col-span-2">
        <div className="item--thumbnail" style={{ minWidth: 36, maxWidth: 36 }}>
          {tax.entity_name && getFirstLetter(tax.entity_name)}
        </div>
        <div>
          <p className="pb-0 text-sm font-medium truncate">
            {tax.entity_name && tax.entity_name.length > 1
              ? limitString(tax.entity_name, 30)
              : 'No name'}
          </p>
          <label className="text-xs ">{tax.tax_year}</label>
        </div>
      </div>
      <div className="flex col-span-1 gap-2 truncate">
        <label className="text-xs truncate">{tax.deal_names}</label>
      </div>
      <div className="flex flex-col col-span-1 truncate">
        <label className="text-xs ">{tax.provider_id}</label>
      </div>
      <div className="flex flex-col col-span-1 truncate">
        <label className="text-xs ">EIN: {tax.entity_ein}</label>
      </div>
      <div className="col-span-1 truncate">
        <ChipStatus small={true} status={tax.filing_status} />
      </div>
      <div className="col-span-1 truncate">
        <Button
          loading={loading}
          small={true}
          icon={
            <Image
              src="/download.svg"
              alt={'Download'}
              className="opacity-75 invert"
              width={18}
              height={18}
            />
          }
          onClick={async () => {}}
          label="Download"
        />
      </div>
    </div>
  );
}
