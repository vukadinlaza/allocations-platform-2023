'use client';
import Button from '@/components/Button';
import InvestmentSidebar from '@/components/Investments/Sidebar';
import ItemsHeader from '@/components/Deals/Header';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { toast } from 'react-toastify';
const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  ssr: false
});

const copyCurrentUrl = async () => {
  await navigator.clipboard.writeText(window.location.href);
  toast.success('Link copied to clipboard');
};

export default function DealClient({ deal }: { deal: Deal }) {
  const { supabase } = useSupabase();
  const [pitchDeckFileId, setPitchDeckFileId] = useState(null);
  const [pitchDeckFileData, setPitchDeckFileData] = useState<Blob | null>(null);
  const fetchPitchDeckFile = async (dealId: string) => {
    const { data, error } = await supabase.rpc('deal_get_file', {
      dealid: dealId,
      filetype: 'pitch-deck'
    });
    if (data) {
      setPitchDeckFileId(data);
      const fileData = await AllocationsAPI.downloadPDFFile(data);
      if (fileData.ok) {
        setPitchDeckFileData(await fileData.blob());
      }
    }
  };
  useEffect(() => {
    void fetchPitchDeckFile(deal.id as string);
  }, []);
  return (
    <div className="w-full deal">
      <div className="container grid grid-cols-1 gap-8 mt-8 md:grid-cols-6">
        <div className="md:col-span-4">
          <header className="flex items-start justify-between md:mb-8">
            <ItemsHeader deal={deal} />
            <div className="items-center hidden gap-4 md:flex">
              <Button
                loading={false}
                disabled={false}
                label={'Copy link'}
                onClick={copyCurrentUrl}
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
            </div>
          </header>
          <main className="deal--main">
            <div>
              <h1 className="mb-4 text-lg md:mb-8 md:text-2xl">Pitch deck</h1>
              {!pitchDeckFileId && 'No pitch deck available.'}
              {pitchDeckFileData && (
                <div>
                  <PdfViewer file={pitchDeckFileData as File} />
                </div>
              )}
            </div>
            <div>
              <h1 className="mb-4 text-lg md:mb-8 md:text-2xl">Deal memo</h1>
              {deal.memo && (
                <div className="deal--description">
                  {ReactHtmlParser(deal.memo)}
                </div>
              )}
              {/* <div className="deal--description">
                {deal.memo && (
                  <div dangerouslySetInnerHTML={{ __html: deal.memo }} />
                )}
                {!deal.memo && <span>No memo yet.</span>}
              </div> */}
            </div>
            <div>
              <h1 className="mb-4 text-lg md:mb-8 md:text-2xl">Disclaimer</h1>
              <p>
                Allocations, Inc., (Allocations), does not provide investment,
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
        <div className="md:col-span-2">
          <InvestmentSidebar deal={deal} />
        </div>
      </div>
    </div>
  );
}
