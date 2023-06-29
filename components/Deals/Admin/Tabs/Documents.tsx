import Button from '@/components/Button';
import DocumentsRow from '@/components/Documents/Row';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';

export default function DealAdminDocuments({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [bulkDownloading, setBulkDownloading] = useState<boolean>(false);
  const [dealDocuments, setDealDocuments] = useState<any>([]);
  const [limit, setLimit] = useState<any>(5);
  const [dealLimit, setDealLimit] = useState<any>(5);
  const [investmentDocuments, setInvestmentDocuments] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const fetchDocuments = async () => {
    if (!deal) return;
    try {
      setLoading(true);

      let { data: investments, error: investmentsError } = await supabase
        .from('investments')
        .select('*, investments_files(*, files(*)), identities(legal_name)')
        .eq('deal_id', deal.id)
        .neq('status', 'archived');

      const investmentFiles = [];

      if (investments) {
        for (const investment of investments) {
          for (const investmentFile of investment.investments_files) {
            investmentFiles.push({
              ...investmentFile.files,
              investment_id: investment.id,
              investment_email: investment.user_email,
              name: investment.user_email,
              investment_name:
                investment?.identities?.legal_name ?? investment.user_email
            });
          }
        }
      }

      let { data: deal_files, error: dealFilesError } = await supabase
        .from('deals_files')
        .select('*, files(*)')
        .eq('deals_id', deal.id);

      const dealFiles = [];

      if (deal_files) {
        for (const dealFile of deal_files) {
          dealFiles.push({
            ...dealFile.files,
            name: dealFile.files.file_name,
            dealId: deal.id
          });
        }
      }
      setInvestmentDocuments(investmentFiles);
      setDealDocuments(dealFiles);

      // if (investments) {
      //   setTransactions(
      //     investments.map((invest) => ({
      //       ...invest.users,
      //       name: `${invest.users.first_name} ${invest.users.last_name}`,
      //       status: invest.status,
      //       subscription_amount: invest.subscription_amount,
      //       documents: 'None'
      //     }))
      //   );
      // }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadAll = async () => {
    setButtonLoading(true);
    const response = await AllocationsAPI.downloadZipFile(
      investmentDocuments.map((d: any) => d.id)
    );
    if (response.ok) {
      await downloadFile(await response.blob(), `download.zip`);
    } else {
      console.error('Failed to download the document');
    }
    setButtonLoading(false);
  };
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && (
        <>
          <div className="grid gap-4">
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="mb-6 text-xl font-medium">Investor documents</h2>
                <Button
                  label="Download all"
                  loading={buttonLoading}
                  small={true}
                  onClick={async () => {
                    await downloadAll();
                  }}
                />
              </div>
              {investmentDocuments.length === 0 && (
                <None text="No documents yet." />
              )}
              {investmentDocuments.length > 0 && (
                <div className="grid gap-2">
                  {investmentDocuments
                    .slice(0, limit)
                    .map((document: any, index: number) => (
                      <DocumentsRow
                        dealDocuments={dealDocuments}
                        document={document}
                        key={index}
                      />
                    ))}
                  <div className="my-4">
                    <Button
                      color="info"
                      small={true}
                      onClick={() => setLimit(limit + 5)}
                      label={'Show more'}
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="mb-6 text-xl font-medium">Deal documents</h2>
              </div>
              {dealDocuments.length === 0 && (
                <None text="No deal documents yet." />
              )}
              {dealDocuments.length > 0 && (
                <div className="grid gap-2">
                  {dealDocuments
                    .slice(0, dealLimit)
                    .map((document: any, index: number) => (
                      <DocumentsRow
                        dealDocuments={dealDocuments}
                        document={document}
                        key={index}
                      />
                    ))}
                  <div className="my-4">
                    {dealDocuments.length > limit && (
                      <Button
                        color="info"
                        small={true}
                        onClick={() => setDealLimit(dealLimit + 5)}
                        label={'Show more'}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
