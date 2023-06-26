'use client';
import { getFirstLetter, limitString } from '@/lib/utils';
import Image from 'next/image';
import ChipStatus from '../ChipStatus';
import Price from '../Price';
import { openURL } from '../Table';

export default function DealItem({
  deal,
  details = false,
  open = false
}: {
  deal: any;
  details?: boolean;
  open?: boolean;
}) {
  return (
    <div
      className="justify-between item"
      onClick={() => {
        if (details || open) openURL(`/deals/${deal.id}`, '_blank');
      }}
    >
      <div className="item--thumbnail">
        {deal.name && getFirstLetter(deal.name)}
      </div>
      <div className={`grid items-start pr-2`} style={{ minWidth: 250 }}>
        {deal.name && (
          <p className="pb-0 text-sm font-medium truncate">
            {deal.name && deal.name.length > 1
              ? limitString(deal.name, 33)
              : 'No name'}
          </p>
        )}
        {details && (
          <div>
            {deal.fund_manager_email && (
              <p className="mb-0 text-xs text-gray-500">
                {deal.fund_manager_email}
              </p>
            )}
            {deal.status === 'draft' && !deal.fund_manager_email && (
              <span className="px-2 py-1 text-xs rounded-lg text-amber-800 bg-amber-100">
                Please select a fund manager
              </span>
            )}
          </div>
        )}
      </div>
      {details && (
        <div className="flex items-center justify-end gap-4 grow">
          <div className="flex gap-2 text-sm text-gray-500">
            <Price price={deal.total_raised_amount} />
          </div>
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
      {open && (
        <div className="flex items-center justify-end">
          <Image
            src={'/open.svg'}
            alt="copy"
            className="opacity-50"
            width={20}
            height={20}
          />
        </div>
      )}
    </div>
  );
}
