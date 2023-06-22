'use client';
import { getFirstLetter, limitString } from '@/lib/utils';
import Image from 'next/image';
import ChipStatus from '../ChipStatus';
import { openURL } from '../Table';

export default function DealItem({
  deal,
  details = false
}: {
  deal: any;
  details?: boolean;
}) {
  return (
    <div
      className="item"
      onClick={() => {
        if (details) openURL(`/deals/${deal.id}`);
      }}
    >
      <div className="item--thumbnail">
        {deal.name && getFirstLetter(deal.name)}
      </div>
      <div className="grid items-start pr-2 grow" style={{ maxWidth: 200 }}>
        {deal.name && (
          <p className="text-sm font-medium truncate">
            {deal.name && deal.name.length > 1
              ? limitString(deal.name, 33)
              : 'No name'}
          </p>
        )}
      </div>
      {details && (
        <div className="flex items-center justify-end gap-2 grow">
          <div className="flex justify-end grow">
            <ChipStatus status={deal.status} />
          </div>
          <div>
            <Image
              src="/settings.svg"
              alt={'settings'}
              className="opacity-50"
              width={18}
              height={18}
            />
          </div>
        </div>
      )}
    </div>
  );
}
