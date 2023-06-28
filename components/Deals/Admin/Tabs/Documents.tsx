import DocumentsRow from '@/components/Documents/Row';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Table from '@/components/Table';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Deal } from '@/types';
import { File } from '@/types/files';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export default function DealAdminDocuments({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [bulkDownloading, setBulkDownloading] = useState<boolean>(false);
  const [dealDocuments, setDealDocuments] = useState<any>([]);
  const [investmentDocuments, setInvestmentDocuments] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let headers = [
    {
      label: 'Created At',
      key: 'created_at',
      type: 'date'
    },
    {
      label: 'Type',
      key: 'type',
      type: 'chip-static'
    },
    {
      button_label: 'Download',
      label: 'Download',
      key: 'download',
      type: 'button',
      icon: 'download',
      action: async (item: File) => {
        const response = await AllocationsAPI.downloadPDFFile(item.id);
        if (response.ok) {
          await downloadFile(await response.blob(), `${item.file_name}.pdf`);
        } else {
          console.error('Failed to download the document');
        }
      }
    },
    {
      button_label: 'View',
      label: 'View',
      key: 'view',
      type: 'button',
      icon: 'download',
      action: async (item: File) => {
        const response = await AllocationsAPI.downloadPDFFile(item.id);
        if (response.ok) {
          const fileURL = window.URL.createObjectURL(await response.blob());
          window.open(fileURL);
        } else {
          console.error('Failed to download the document');
        }
      }
    }
  ];

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
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && (
        <>
          <div>
            <h2 className="text-xl font-medium">Investor documents</h2>
            {investmentDocuments.length > 0 && (
              <None text="No documents yet." />
            )}
            {investmentDocuments.length > 0 && (
              <div className="grid gap-2">
                {investmentDocuments.map((document: any, index: number) => (
                  <DocumentsRow document={document} key={index} />
                ))}
              </div>
            )}
          </div>
          {/* <div>
            <h2 className="text-xl font-medium">Deal documents</h2>
            {investmentDocuments.length > 0 && <None text="No documents yet" />}
            {investmentDocuments.length > 0 && <></>}
          </div> */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Investor Documents
          </Typography>
          <LoadingButton
            loading={bulkDownloading}
            onClick={async () => {
              setBulkDownloading(true);
              if (investmentDocuments) {
                const response = await AllocationsAPI.downloadZipFile(
                  investmentDocuments.map((d: any) => d.id)
                );
                if (response.ok) {
                  await downloadFile(await response.blob(), `download.zip`);
                } else {
                  console.error('Failed to download the document');
                }
                setBulkDownloading(false);
              }
            }}
          >
            Download All
          </LoadingButton>
          {!loading && !investmentDocuments && (
            <None text="No investor documents yet." />
          )}
          {!loading &&
            investmentDocuments &&
            investmentDocuments.length > 0 && (
              <Table
                data={investmentDocuments}
                headers={[
                  {
                    label: 'Email',
                    key: 'investmentEmail',
                    type: 'email'
                  },
                  ...headers
                ]}
              />
            )}
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Deal Documents
          </Typography>
          <LoadingButton
            loading={bulkDownloading}
            onClick={async () => {
              setBulkDownloading(true);
              if (dealDocuments) {
                const response = await AllocationsAPI.downloadZipFile(
                  dealDocuments.map((d: any) => d.id)
                );
                if (response.ok) {
                  await downloadFile(await response.blob(), `download.zip`);
                } else {
                  console.error('Failed to download the document');
                }
                setBulkDownloading(false);
              }
            }}
          >
            Download All
          </LoadingButton>
          {!loading && !dealDocuments && <None text="No deal documents yet." />}
          {!loading && dealDocuments && dealDocuments.length > 0 && (
            <Table data={dealDocuments} headers={headers} />
          )}
        </>
      )}
    </div>
  );
}
