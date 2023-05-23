'use client';
import Button from '@/components/Button';
import InvestmentSidebar from '@/components/Investments/Sidebar';
import ItemsHeader from '@/components/Items/Header';
import { Deal } from '@/types';
import Image from 'next/image';

export default function DealClient({
  deal,
  demo = false
}: {
  deal: Deal;
  demo?: boolean;
}) {
  return (
    <div className="w-full deal">
      <div className="container grid grid-cols-6 gap-8 mt-8">
        <div className="col-span-4">
          <header className="flex items-start justify-between mb-8">
            <ItemsHeader data={deal} />
            <div className="flex items-center gap-4">
              {!demo && (
                <Button
                  loading={false}
                  disabled={false}
                  label={'Copy link'}
                  onClick={() => {}}
                  icon={
                    <Image
                      src={'/copy.svg'}
                      alt="copy"
                      className="opacity-50 invert"
                      width={20}
                      height={20}
                    />
                  }
                />
              )}
            </div>
          </header>
          <main className="deal--main">
            <div>
              <h1 className="mb-8 text-2xl">Pitch deck</h1>
              <div className="deal--description">No pitch deck.</div>
            </div>
            <div>
              <h1 className="mb-8 text-2xl">Deal memo</h1>
              <div className="deal--description">
                {deal.memo && (
                  <div dangerouslySetInnerHTML={{ __html: deal.memo }} />
                )}
                {!deal.memo && <span>No memo yet.</span>}
              </div>
            </div>
            <div>
              <h1 className="mb-8 text-2xl">Disclaimer</h1>
              <p>
                Allocations, Inc., (“Allocations”), does not provide investment,
                tax, or legal advice, and no information provided should be
                construed as such. Therefore, information on this page should
                not be relied upon as research, investment advice or a
                recommendation of any kind. You are encouraged to consult with
                your investment advisers and other counsel prior to investing.
                Some of the information provided by Allocations herein, has been
                obtained from third-party sources and believed to be accurate as
                of the date of publication; however, no warranties or other
                guarantees are given as to the accuracy or completeness of the
                information. Past performance is not indicative of future
                returns. Examples of past investments by syndicates are purely
                for illustrative purposes.Some institutional and professional
                investors may have additional material information about this
                deal. These investors may also have access to a broader set of
                deals than is available to other backers on the Allocations
                platform, may be able to view deals before other backers, and
                have certain other preferential deal access and allocation
                rights. The existence of these additional rights and privileges
                may be material to your investment decision.
              </p>
            </div>
          </main>
        </div>
        <div className="col-span-2">
          <InvestmentSidebar deal={deal} demo={demo} />
        </div>
      </div>
    </div>
  );
}
