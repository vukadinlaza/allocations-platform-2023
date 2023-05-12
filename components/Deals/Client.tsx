'use client';
import ChipStatus from '@/components/ChipStatus';
import InvestmentCard from '@/components/Investments/Card';
import { Deal } from '@/types';
import Image from 'next/image';
import Button from '../Button';

export default function DealClient({ deal }: { deal: Deal }) {
  return (
    <div className="container grid grid-cols-6 gap-8 mt-8 deal">
      <div className="col-span-4">
        <header className="flex items-start justify-start mb-16">
          <div className="flex items-center justify-center w-16 h-16 mt-1 mr-4 text-white rounded bg-primary-500">
            {deal.name && <h1 className="mb-0 text-3xl">{deal.name[0]}</h1>}
          </div>
          <div className="flex flex-col items-start gap-2 grow">
            {deal.name && <h1 className="mb-0 text-3xl">{deal.name}</h1>}
            {deal.status && <ChipStatus small status={deal.status} />}
          </div>
          <div>
            <Button
              loading={false}
              disabled={false}
              label={'Open pitch deck'}
              onClick={() => {}}
              icon={
                <Image
                  src={'/pitch.svg'}
                  alt="pitch"
                  className="opacity-50 invert"
                  width={24}
                  height={24}
                />
              }
            />
          </div>
        </header>
        <main>
          <div>
            <h1 className="mb-8 text-2xl">Description</h1>
            <div className="deal--description">
              {!deal.description && <p>No description.</p>}
              {deal.description && (
                <p dangerouslySetInnerHTML={{ __html: deal.description }} />
              )}
            </div>
          </div>
        </main>
      </div>
      <div className="col-span-2">
        <InvestmentCard deal={deal} />
      </div>
    </div>
  );
}
