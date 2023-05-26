'use client';
import Button from '@/components/Button';
import ChipStatus from '@/components/ChipStatus';
import DateComponent from '@/components/DateComponent';
import None from '@/components/None';
import Price from '@/components/Price';
import { openURL } from '@/components/Table';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Investment } from '@/types';
import { Card } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InvestmentId() {
  const { supabase } = useSupabase();
  const [investment, setInvestment] = useState<Investment>();
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const params = useParams();

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
        const response = await AllocationsAPI.downloadFile(
          found?.file_id ?? found?.files_id
        );
        if (response.ok) {
          await downloadFile(await response.blob(), `${type}.pdf`);
        } else {
          console.error('Failed to download the document');
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
      const { data: _investment, error } = await supabase
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

      if (_investment) {
        setInvestment(_investment);
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
            <Card className="mx-auto rounded-lg card" sx={{ maxWidth: 575 }}>
              <div className="flex items-center justify-center p-4 mb-6 rounded-full bg-primary-500/10">
                <Image
                  src="/checked_rounded.svg"
                  alt={'confirm'}
                  width={48}
                  height={48}
                />
              </div>
              <h1 className="mb-8">Your investment receipt</h1>
              <Card
                className="flex items-center justify-between w-full p-4 mb-8"
                variant="outlined"
              >
                <p>{investment.deals.name}</p>
                <Button
                  label="Open Deal"
                  onClick={() =>
                    openURL(`/deals/${investment?.deals?.id}`, '_blank')
                  }
                />
              </Card>
              <div className="w-full">
                <h1 className="mb-4">Investment details</h1>
                <div className="flex items-center justify-between py-4 border-b">
                  <p>Date</p>
                  {investment.created_at && (
                    <DateComponent date={investment.created_at} />
                  )}
                </div>
                <div className="flex items-center justify-between py-4 border-b">
                  <p>Status</p>
                  {investment.status && (
                    <ChipStatus small={true} status={investment.status} />
                  )}
                </div>
                <div className="flex items-center justify-between py-4 border-b">
                  <p>Amount</p>
                  {investment.subscription_amount && (
                    <Price price={investment.subscription_amount} />
                  )}
                </div>
              </div>
              {investment &&
                String(investment.status).toLowerCase() === 'signed' && (
                  <div className="flex items-center justify-center gap-4 my-8">
                    <Button
                      small={true}
                      disabled={
                        !investment.investments_files?.length || buttonLoading
                      }
                      label="Download SPV Agreement"
                      icon={
                        <Image
                          src="/download.svg"
                          alt={'Download'}
                          className="opacity-75 invert"
                          width={24}
                          height={24}
                        />
                      }
                      onClick={() => downloadAgreement()}
                    />
                    <Button
                      small={true}
                      disabled={buttonLoading}
                      label="Download Wire Instructions"
                      icon={
                        <Image
                          src="/download.svg"
                          alt={'Download'}
                          className="opacity-75 invert"
                          width={24}
                          height={24}
                        />
                      }
                      onClick={() => downloadAgreement('wire-instructions')}
                    />
                  </div>
                )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
