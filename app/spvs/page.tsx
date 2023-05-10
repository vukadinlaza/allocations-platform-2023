'use client';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';

export default function SPVS() {
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

  const dialog = {
    element: 'SPV',
    model: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        show: true
      },
      {
        key: 'type',
        label: 'Type',
        type: 'string',
        show: false,
        disabled: true,
        value: 'spv'
      }
    ],
    table: 'deals',
    type: 'FormsNew'
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.spvs}
        query={`*`}
        queryType="spv"
        table="deals"
        type="spv"
      />
    </div>
  );
}
