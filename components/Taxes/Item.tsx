'use client';

import { useAuthContext } from '@/app/(private)/context';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile, getFirstLetter, limitString } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import Button from '../Button';
import ChipStatus from '../ChipStatus';

export default function TaxesItem({ tax }: { tax: any }) {
  const [loading, setLoading] = useState(false);
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();

  console.log(tax);
  return (
    <div className="grid grid-cols-8 gap-2 item">
      <div className="flex col-span-2">
        <div className="item--thumbnail" style={{ minWidth: 36, maxWidth: 36 }}>
          {tax.entity_name && getFirstLetter(tax.entity_name)}
        </div>
        <div className="flex flex-col">
          <span className="mb-0 text-sm font-medium truncate">
            {tax.entity_name && tax.entity_name.length > 1
              ? limitString(tax.entity_name, 22)
              : 'No name'}
          </span>
          <label className="text-xs ">{tax.tax_year}</label>
        </div>
      </div>
      <div className="flex col-span-1 gap-2 truncate">
        <label className="text-xs truncate">{tax.deal_names}</label>
      </div>
      <div className="flex flex-col col-span-1 truncate">
        <label className="text-xs ">{tax.entity_ein}</label>
      </div>
      <div className="flex flex-col col-span-1 truncate">
        <label className="text-xs ">{tax.provider_id}</label>
      </div>
      <div className="col-span-1 truncate">
        <ChipStatus small={true} status={tax.filing_status} />
      </div>
      <div className="flex items-end justify-end col-span-1 truncate">
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
          onClick={async () => {
            if (!tax.organization_id)
              return notify('Download is not yet available.');
            const { organization_id, id } = tax;

            const { data, error } = await supabase.storage
              .from('taxes')
              .download(`${organization_id}/2022/${id}.zip`);

            if (error)
              return notify('Sorry, an error occurred downloading your taxes.');

            if (data) {
              await downloadFile(await data, 'taxes.zip');
              notify('Downloading...', true);
            }
          }}
          label="Download"
        />
      </div>
      <div className="flex items-end justify-end col-span-1 truncate">
        <Button
          loading={loading}
          small={true}
          disabled={true}
          onClick={() => {}}
          icon={
            <Image
              src="/settings.svg"
              alt={'setting'}
              className="opacity-75 invert"
              width={18}
              height={18}
            />
          }
          label="Manage"
        />
      </div>
    </div>
  );
}
