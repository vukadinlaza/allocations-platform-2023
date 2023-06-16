import { useAuthContext } from '@/app/(private)/context';
import LoadingList from '@/components/Loading/List';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { useEffect, useState } from 'react';
import TableComponent from '../Table';

export default function TaxesFundManager() {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [taxes, setTaxes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      type: 'chip'
    },
    {
      label: 'Entity return',
      key: 'entity_return',
      type: 'download',
      disabled: false,
      // disabled: (item: any) => item.filing_status !== 'complete',
      tooltip: 'Review or download your entity return when available',
      action: async (item: any) => {
        if (item) {
          if (!item.organization_id)
            return notify('Download is not yet available.');
          const { organization_id, id } = item;

          const { data, error } = await supabase.storage
            .from('taxes')
            .download(`${organization_id}/2022/${id}.zip`);

          if (error)
            return notify('Sorry, an error occurred downloading your taxes.');

          if (data) {
            console.log(data);
            await downloadFile(
              await data,
              'taxes.zip'
            );
            notify('Downloading...', true);
          }
        }
      }
    },
    {
      label: 'Manage investor returns',
      key: 'manage_investor_returns',
      type: 'button',
      button_label: 'Manage',
      action: () => {},
      disabled: true,
      tooltip: 'Tooltip: Click to view individual investor K-1s'
    }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);

      // let { data, error } = await supabase
      //   .from('entities_taxes')
      //   .select('*, entities (id, name, deals(id, name))')
      //   .eq('tax_year', '2022')
      //   .order('filing_status', { ascending: true });

      let { data, error } = await supabase
        .from('entities_taxes')
        .select('*, entities (id, name, deals(id, name))')
        .eq('organization_id', '534da345-b096-4311-a88d-4ebd360506d1')
        .order('filing_status', { ascending: true });

      if (error) return;
      console.log(data);
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
    records = records.map((record) => ({
      ...record,
      deal_names:
        record?.entities?.deals.map((d: any) => d.name).join(', ') ?? '',
      filing_status: record?.filing_status
        ? record?.filing_status
        : 'Extension Filed'
    }));
    return records;
  };

  return (
    <div className="w-full mt-6">
      {loading && <LoadingList />}
      {/* {!loading && (
        <div>
          {taxes.map((tax: any, index: number) => {
            <TaxesItem key={index} tax={tax} />;
          })}
        </div>
      )} */}
      {!loading && (
        <TableComponent
          blank_value={''}
          headers={headers}
          data={dataFixup(taxes)}
        />
      )}
    </div>
  );
}
