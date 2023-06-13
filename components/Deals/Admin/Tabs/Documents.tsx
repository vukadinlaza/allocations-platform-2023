import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Table from '@/components/Table';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Deal } from '@/types';
import { DealFileMeta, File, InvestmentFileMeta } from '@/types/files';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import LoadingButton from "@mui/lab/LoadingButton";

export default function DealAdminDocuments({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [bulkDownloading, setBulkDownloading] = useState<boolean>(false);
  const [dealDocuments, setDealDocuments] = useState<Array<
    File & DealFileMeta
  > | null>(null);
  const [investmentDocuments, setInvestmentDocuments] = useState<Array<
    File & InvestmentFileMeta
  > | null>(null);
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
    }
  ];

  const fetchDocuments = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      const investmentFiles: Array<File & InvestmentFileMeta> = [];
      const dealFiles: Array<File & DealFileMeta> = [];
      // documents
      let { data: investments, error: investmentsError } = await supabase
        .from('investments')
        .select('*, investments_files(*, files(*)), identities(legal_name)')
        .eq('deal_id', deal.id)
        .neq('status', 'archived');
      if (investments) {
        for (const investment of investments) {
          for (const investmentFile of investment.investments_files) {
            investmentFiles.push({
              ...investmentFile.files,
              investmentId: investment.id,
              investmentEmail: investment.user_email,
              investmentName:
                investment?.identities?.legal_name ?? investment.user_email
            });
          }
        }
      }

      let { data: deal_files, error: dealFilesError } = await supabase
        .from('deals_files')
        .select('*, files(*)')
        .eq('deals_id', deal.id);

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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Investor Documents
      </Typography>
      <LoadingButton loading={bulkDownloading} onClick={async ()=>{
        setBulkDownloading(true);
        if(investmentDocuments) {
          const response = await AllocationsAPI.downloadZipFile(investmentDocuments.map(d => d.id));
          if (response.ok) {
            await downloadFile(await response.blob(), `download.zip`);
          } else {
            console.error('Failed to download the document');
          }
          setBulkDownloading(false);
        }
      }}>Download All</LoadingButton>
      {!loading && !investmentDocuments && (
        <None text="No investor documents yet." />
      )}
      {!loading && investmentDocuments && investmentDocuments.length > 0 && (
        <Table
          data={investmentDocuments}
          headers={[
            {
              label: 'Email',
              key: 'investmentEmail',
              type: 'email'
            },
            ...headers,
          ]}
        />
      )}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        Deal Documents
      </Typography>
      <LoadingButton loading={bulkDownloading} onClick={async ()=>{
        setBulkDownloading(true);
        if(dealDocuments) {
          const response = await AllocationsAPI.downloadZipFile(dealDocuments.map(d => d.id));
          if (response.ok) {
            await downloadFile(await response.blob(), `download.zip`);
          } else {
            console.error('Failed to download the document');
          }
          setBulkDownloading(false);
        }
      }}>Download All</LoadingButton>
      {!loading && !dealDocuments && <None text="No deal documents yet." />}
      {!loading && dealDocuments && dealDocuments.length > 0 && (
        <Table data={dealDocuments} headers={headers} />
      )}
    </div>
  );
}
