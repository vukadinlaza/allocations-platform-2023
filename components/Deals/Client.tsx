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
            {!deal.name && <h1 className="mb-0 text-3xl">N</h1>}
            {deal.name && <h1 className="mb-0 text-3xl">{deal.name[0]}</h1>}
          </div>
          <div className="flex flex-col items-start gap-2 grow">
            {!deal.name && (
              <h1 className="mb-0 text-3xl">Deal with no name.</h1>
            )}
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
        <main className="deal--main">
          <div>
            <h1 className="mb-8 text-2xl">Description</h1>
            <div className="deal--description">
              {!deal.description && <p>No description.</p>}
              {deal.description && (
                <p dangerouslySetInnerHTML={{ __html: deal.description }} />
              )}
            </div>
          </div>
          <div>
            <h1 className="mb-8 text-2xl">Disclaimer</h1>
            <p>
              Allocations, Inc., (“Allocations”), does not provide investment,
              tax, or legal advice, and no information provided should be
              construed as such. Therefore, information on this page should not
              be relied upon as research, investment advice or a recommendation
              of any kind. You are encouraged to consult with your investment
              advisers and other counsel prior to investing. Some of the
              information provided by Allocations herein, has been obtained from
              third-party sources and believed to be accurate as of the date of
              publication; however, no warranties or other guarantees are given
              as to the accuracy or completeness of the information. Past
              performance is not indicative of future returns. Examples of past
              investments by syndicates are purely for illustrative
              purposes.Some institutional and professional investors may have
              additional material information about this deal. These investors
              may also have access to a broader set of deals than is available
              to other backers on the Allocations platform, may be able to view
              deals before other backers, and have certain other preferential
              deal access and allocation rights. The existence of these
              additional rights and privileges may be material to your
              investment decision.
            </p>
          </div>
        </main>
      </div>
      <div className="col-span-2">
        <InvestmentCard deal={deal} />
      </div>
    </div>
  );
}
