'use client';
import { useAuthContext } from '@/app/(private)/context';
import LoadingList from '@/components/Loading/List';
import { useSupabase } from '@/lib/supabase-provider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TaxesItem from './Item';

export default function TaxesFundManager() {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [taxes, setTaxes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const headers = [
    {
      label: 'Entity name',
      key: 'entity_name',
      type: 'string',
      tooltip: 'The legal name of the entity',
      col: 'col-span-2'
    },
    {
      label: 'Deal name',
      key: 'deal_names',
      type: 'string'
    },
    {
      label: 'EIN',
      key: 'entity_ein',
      type: 'string'
    },
    {
      label: 'Record ID',
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
      tooltip: 'Review or download your entity return when available'
    },
    {
      label: 'Manage',
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

      let { data, error } = await supabase
        .from('entities_taxes')
        .select('*, entities (id, name, deals(id, name))')
        .eq('tax_year', '2022')
        .order('filing_status', { ascending: true });

      if (error) return;
      if (data)
        setTaxes(
          data.map((record) => ({
            ...record,
            deal_names:
              record?.entities?.deals.map((d: any) => d.name).join(', ') ?? '',
            filing_status: record?.filing_status
              ? record?.filing_status
              : 'Extension Filed'
          }))
        );
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
      {!loading && (
        <div className="grid gap-3">
          <div className="grid grid-cols-8 gap-2">
            {headers.map((header: any) => (
              <div key={header.key} className={`px-2 ${header.col}`}>
                <label className="text-xs">{header.label}</label>
                {header.tooltip && (
                  <Tooltip title={header.tooltip}>
                    <IconButton className="p-0 px-2">
                      <Image
                        width={18}
                        height={18}
                        src="/question.svg"
                        alt="question"
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            ))}
          </div>
          {taxes.map((tax: any, index: number) => (
            <TaxesItem key={index} tax={tax} />
          ))}
        </div>
      )}
    </div>
  );
}
