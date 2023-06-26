'use client';
import ChipStatus from '@/components/ChipStatus';
import DateComponent from '@/components/DateComponent';
import DealItem from '@/components/Deals/Item';
import InvestmentDocumentBox from '@/components/Investments/Documents/Box';
import None from '@/components/None';
import Price from '@/components/Price';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Investment } from '@/types';
import { File } from '@/types/files';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context';

export default function InvestmentId() {
  const { notify } = useAuthContext();
  const { supabase } = useSupabase();
  const [investment, setInvestment] = useState<Investment>();
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const params = useParams();

  let documentsHeaders = [
    {
      label: 'Type',
      key: 'type',
      type: 'chip-static'
    },
    {
      label: 'Download',
      key: 'download',
      type: 'download',
      icon: 'download',
      action: async (item: File) => {
        const response = await AllocationsAPI.downloadPDFFile(item.id);
        if (response.ok) {
          await downloadFile(await response.blob(), `${item.file_name}.pdf`);
        } else {
          console.error('Failed to download the document');
        }
      }
    }
  ];

  const downloadAgreement = async (type = 'subscription-agreement') => {
    if (!investment) return;
    try {
      setButtonLoading(true);
      const target =
        type === 'subscription-agreement'
          ? investment.investments_files
          : investment.deals.deals_files;

      const found = target.find((x: any) => x.files.type === type);
      if (found) {
        const response = await AllocationsAPI.downloadPDFFile(
          found?.file_id ?? found?.files_id
        );
        if (response.ok) {
          await downloadFile(await response.blob(), `${type}.pdf`);
        } else {
          console.error('Failed to download the document');
          notify('Sorry, the PDF file could not be downloaded');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  async function fetchInvestment() {
    if (!params || !params.id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('investments')
        .select(
          `*,
          deals(
            *,
            deals_files(
              *,
              files(*)
            )
          ),
          investments_files(
            *,
            files(*)
          )`
        )
        .eq('id', params.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setInvestment(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // let canvas = document.getElementById('my-canvas');

  // // you should  only initialize a canvas once, so save this function
  // // we'll save it to the canvas itself for the purpose of this demo
  // canvas.confetti =
  //   canvas.confetti || confetti.create(canvas, { resize: true });

  // canvas.confetti({
  //   spread: 70,
  //   origin: { y: 1.2 }
  // });

  useEffect(() => {
    fetchInvestment();
  }, []);

  return (
    <div className="container w-full">
      {loading && <div>loading</div>}
      {!loading && (
        <div>
          {!investment && <None text="No investment found." />}
          {investment && (
            <div
              className="flex-col px-8 py-6 mx-auto bg-white border rounded-lg"
              style={{ maxWidth: 500 }}
            >
              <header className="flex flex-col items-center justify-center w-full gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 p-2 rounded-full bg-primary-500/10">
                  <Image
                    src="/checked_rounded.svg"
                    alt={'confirm'}
                    width={48}
                    height={48}
                  />
                </div>
                <h2 className="mb-0">Investment success!</h2>
                <h3 className="text-xl font-bold">
                  {investment.subscription_amount && (
                    <Price price={investment.subscription_amount} />
                  )}
                </h3>
                <div>
                  {investment.status && (
                    <ChipStatus status={investment.status} />
                  )}
                </div>
                <label htmlFor="" className="text-xs">
                  {investment.created_at && (
                    <DateComponent date={investment.created_at} />
                  )}
                </label>
              </header>
              {investment.deals && (
                <DealItem deal={investment.deals} open={true} />
              )}
              {investment.status !== 'archived' && (
                <div className="my-8 text-center">
                  <header className="mb-6">
                    <h2>Documents</h2>
                    <label className="text-xs">Click to download</label>
                  </header>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div onClick={() => downloadAgreement()}>
                      <InvestmentDocumentBox
                        file={{
                          name: `${investment.deals.type} Agreement`
                        }}
                        loading={buttonLoading}
                      />
                    </div>
                    <div onClick={() => downloadAgreement('wire-instructions')}>
                      <InvestmentDocumentBox
                        file={{
                          name: 'Wire Instructions'
                        }}
                        loading={buttonLoading}
                      />
                    </div>
                    {/* {investment.investments_files.map((file: any) => (
                      <InvestmentDocumentBox
                        file={file}
                        loading={buttonLoading}
                        onClick={() => {}}
                      />
                    ))} */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
