'use client';

import ChipStatus from '@/components/ChipStatus';

export default function DealHeader({
  deal,
  button
}: {
  deal: any;
  button?: any;
}) {
  return (
    <header className="flex items-start justify-start mb-8">
      <div className="items-center justify-center hidden w-16 h-16 mt-1 mr-4 text-white rounded md:flex bg-primary-500">
        {!deal.name && <h1 className="mb-0 text-3xl">N</h1>}
        {deal.name && (
          <h1 className="mb-0 text-xl md:text-3xl">{deal.name[0]}</h1>
        )}
      </div>
      <div className="flex flex-col items-start gap-2 grow">
        {deal.name && <h1 className="mb-0 text-xl md:text-3xl">{deal.name}</h1>}
        <div className="flex items-center gap-2">
          {deal.status && <ChipStatus small status={deal.status} />}
        </div>
      </div>
      {button && <div className="hidden md:flex">{button}</div>}
    </header>
  );
}
