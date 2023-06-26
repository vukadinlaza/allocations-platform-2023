'use client';
import DateComponent from '@/components/DateComponent';
import { getFirstLetter, limitString } from '@/lib/utils';
import Image from 'next/image';
import ChipStatus from '../ChipStatus';
import Price from '../Price';
import { openURL } from '../Table';

export default function InvestmentItem({ investment }: { investment: any }) {
  return (
    <div
      className="item"
      onClick={() => openURL(`/investments/${investment.id}`)}
    >
      <div className="item--thumbnail">
        {investment.deal_id && getFirstLetter(investment.deal_id.name)}
      </div>
      <div
        className="grid items-start pr-2"
        style={{ minWidth: 200, maxWidth: 200 }}
      >
        {investment.deal_id && (
          <div className="flex flex-col">
            <span className="pb-0 mb-0 text-sm font-medium truncate">
              {investment.deal_id && investment.deal_id.name.length > 1
                ? limitString(investment.deal_id.name, 22)
                : 'No name'}
            </span>
            <label className="text-xs">
              <DateComponent date={investment.created_at} />
            </label>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end gap-4 grow">
        <div className="flex gap-2 text-sm text-gray-500">
          <Price price={investment.subscription_amount} />
        </div>
        <div className="flex justify-end grow">
          <ChipStatus status={investment.status} />
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
    </div>
  );
}
