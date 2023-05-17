'use client';
import PageList from '@/components/Page/List';
import { Field } from '@/types';
import { Card } from '@mui/material';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function SPVS() {
  const { user } = useAuthContext();

  const header = {
    name: 'SPVs',
    description: 'Manage your spvs.',
    buttons: [
      {
        title: 'Create new',
        action: 'modal'
      }
    ]
  };

  const model: Field[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      show: true
    }
  ];

  const dialog = {
    element: 'SPV',
    table: 'deals',
    type: 'FormsNew'
  };

  return (
    <Card className="card" variant="outlined">
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.spvs}
        model={model}
        query={`*`}
        queryType="spv"
        table="limited_deals"
        type="spv"
      />
    </Card>
  );
}
