import LoadingList from '@/components/Loading/List';
import Table from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

export default function TaxesFundManager() {
  const { supabase } = useSupabase();
  const [taxes, setTaxes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const headers = [
    {
      label: 'Entity name',
      key: 'entity_name',
      type: 'string',
      tooltip: 'The legal name of the entity'
    },
    {
      label: 'Deal name',
      key: 'name',
      type: 'string'
    },
    {
      label: 'Received investor information',
      key: 'received_investor_information',
      type: 'checkbox',
      tooltip:
        'All investor tax information has been received by our tax team and the tax return is in progress'
    },
    {
      label: 'Received tax information',
      key: 'received_tax_information',
      type: 'checkbox',
      tooltip:
        'All tax information has been received by our tax team and the tax return is in progress e.g. Passthrough K-1 if the SPV invested in another SPV'
    },
    // {
    //   label: 'Received asset information',
    //   key: 'received_asset_information',
    //   type: 'checkbox',
    //   tooltip:
    //     'All asset information has been received by our tax team and the tax return is in progress e.g. Convertible note that has accrued interest'
    // },
    {
      label: 'Reviewed',
      key: 'reviewed',
      type: 'checkbox',
      tooltip: 'The tax return has been reviewed by a СРА'
    },
    // {
    //   label: 'Signed by FM',
    //   key: 'status',
    //   type: 'checkbox',
    //   tooltip:
    //     'The tax return has been signed and the K-1 is being submitted for filing to the IRS'
    // },
    {
      label: 'Estimated tax activity',
      key: 'estimated_tax_activity',
      type: 'string',
      tooltip:
        'Estimated tax activity to be reported on the K-1s based on information including: distributions, draft k-1s received. If you see “Minimal activity” in the estimate column, the expense on your K-1 is likely a non-deductible expense and likely will not effect your calculations for filing a personal extension. Please consult your tax professional for guidance.'
    },
    {
      label: 'Entity return',
      key: 'entity_return',
      type: 'download',
      disabled: true,
      tooltip: 'Review or download your entity return when available'
    },
    {
      label: 'Manage investor returns',
      key: 'manage_investor_returns',
      type: 'button',
      button_label: 'Manage',
      action: () => {},
      disabled: true,
      tooltip: 'Tooltip: Click to view individual investor K-1s'
    },
    {
      label: 'Sign entity return',
      key: 'sign_entity_return',
      type: 'button',
      button_label: 'Sign',
      action: () => {},
      disabled: true,
      tooltip: 'Click to sign the entity return'
    }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);

      let { data, error } = await supabase
        .from('entities_taxes')
        .select('*, entities (*)')
        .order('created_at', { ascending: false });

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

  return (
    <div className="w-full mt-6">
      {loading && <LoadingList />}
      {!loading && <Table headers={headers} data={taxes} />}
    </div>
  );
}
