import LoadingList from '@/components/Loading/List';
import Table from '@/components/Table';
import {useSupabase} from '@/lib/supabase-provider';
import {FC, useEffect, useState} from 'react';
import {AllocationsAPI} from "@/lib/allocations-api";
import {downloadFile} from "@/lib/utils";
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';
import {useAuthContext} from "@/app/(private)/context";
import Box from '@mui/material/Box';

const DownloadDialog: FC<{ handleClose: () => void, open: boolean, selectedItemId: string | null }> = (
  {
    handleClose,
    open,
    selectedItemId
  }
) => {
  const [downloading, setDownloading] = useState(false);
  const {notify} = useAuthContext();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {downloading ?"Downloading..." : "Start Download?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Box sx={{
            pb: 3
          }}>Downloading a full tax filing can take up to a minute depending on the number of K-1s.</Box>
          {downloading && <LinearProgress/>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!downloading && <>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={async () => {
              if (selectedItemId) {
                setDownloading(true);
                const response = await AllocationsAPI.downloadFullEntityReturn(selectedItemId);
                if (response.ok) {
                  await downloadFile(await response.blob(), `download.zip`);
                  handleClose();
                } else {
                  notify('Failed to download');
                  console.error('Failed to download the document');
                }
                setDownloading(false);
              }
            }} autoFocus variant="contained" color="primary">
                Start Download
            </Button>
        </>}
      </DialogActions>
    </Dialog>
  )
}

export default function TaxesFundManager() {
  const {supabase} = useSupabase();
  const [taxes, setTaxes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEntityTaxId, setSelectedEntityTaxId] = useState<string | null>(null);
  const [openDownloadDialog, setOpenDownloadDialog] = useState<boolean>(false);

  const headers = [
    // {
    //   label: 'ID',
    //   key: 'id',
    //   type: 'string'
    // },
    {
      label: 'Entity name',
      key: 'entity_name',
      type: 'string',
      tooltip: 'The legal name of the entity'
    },
    {
      label: 'Deal name',
      key: 'deal_names',
      type: 'string'
    },
    {
      label: 'Tax Year',
      key: 'tax_year',
      type: 'string'
    },
    {
      label: 'EIN',
      key: 'entity_ein',
      type: 'string'
    },
    {
      label: 'Allocations Record ID',
      key: 'provider_id',
      type: 'string'
    },
    {
      label: 'Status',
      key: 'filing_status',
      type: 'string'
    },
    // {
    //   label: 'Received investor information',
    //   key: 'received_investor_information',
    //   type: 'checkbox',
    //   tooltip:
    //     'All investor tax information has been received by our tax team and the tax return is in progress'
    // },
    // {
    //   label: 'Received tax information',
    //   key: 'received_tax_information',
    //   type: 'checkbox',
    //   tooltip:
    //     'All tax information has been received by our tax team and the tax return is in progress e.g. Passthrough K-1 if the SPV invested in another SPV'
    // },
    // {
    //   label: 'Received asset information',
    //   key: 'received_asset_information',
    //   type: 'checkbox',
    //   tooltip:
    //     'All asset information has been received by our tax team and the tax return is in progress e.g. Convertible note that has accrued interest'
    // },
    // {
    //   label: 'Reviewed',
    //   key: 'reviewed',
    //   type: 'checkbox',
    //   tooltip: 'The tax return has been reviewed by a СРА'
    // },
    // {
    //   label: 'Signed by FM',
    //   key: 'status',
    //   type: 'checkbox',
    //   tooltip:
    //     'The tax return has been signed and the K-1 is being submitted for filing to the IRS'
    // },
    // {
    //   label: 'Estimated tax activity',
    //   key: 'estimated_tax_activity',
    //   type: 'string',
    //   tooltip:
    //     'Estimated tax activity to be reported on the K-1s based on information including: distributions, draft k-1s received. If you see “Minimal activity” in the estimate column, the expense on your K-1 is likely a non-deductible expense and likely will not effect your calculations for filing a personal extension. Please consult your tax professional for guidance.'
    // },
    {
      label: 'Entity return',
      key: 'entity_return',
      type: 'download',
      disabled: (item: any) => item.filing_status !== 'complete',
      tooltip: 'Review or download your entity return when available',
      action: async (item: any) => {
        setSelectedEntityTaxId(item.id);
        setOpenDownloadDialog(true);
      }
    },
    {
      label: 'Manage investor returns',
      key: 'manage_investor_returns',
      type: 'button',
      button_label: 'Manage',
      action: () => {
      },
      disabled: true,
      tooltip: 'Tooltip: Click to view individual investor K-1s'
    }
    // {
    //   label: 'Sign entity return',
    //   key: 'sign_entity_return',
    //   type: 'button',
    //   button_label: 'Sign',
    //   action: () => {},
    //   disabled: true,
    //   tooltip: 'Click to sign the entity return'
    // }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);

      let {data, error} = await supabase
        .from('entities_taxes')
        .select('*, entities (id, name, deals(id, name))')
        .eq('tax_year', '2022')
        .order('filing_status', {ascending: true});

      if (error) return;

      if (data) setTaxes(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataFixup = (records: any[]) => {
    records = records.map(record => ({
      ...record, deal_names: record?.entities?.deals.map((d: any) => d.name).join(', ') ?? "",
      filing_status: record?.filing_status ? record?.filing_status : "Extension Filed",
    }))
    return records;
  }

  return (
    <div className="w-full mt-6">
      {loading && <LoadingList/>}
      {!loading && <Table blank_value={''} headers={headers} data={dataFixup(taxes)}/>}
      <DownloadDialog
        open={openDownloadDialog}
        handleClose={() => setOpenDownloadDialog(false)}
        selectedItemId={selectedEntityTaxId}
      />
    </div>
  );
}
