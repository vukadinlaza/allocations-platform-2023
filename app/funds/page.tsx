'use client';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';

export default function Funds() {
  const header = {
    name: 'Funds',
    description: 'Manage your funds.',
    buttons: [
      {
        title: 'Create new',
        action: 'modal'
      }
    ]
  };

  const model = [
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
      value: 'fund'
    }
  ];

  const dialog = {
    element: 'fund',
    table: 'deals',
    type: 'FormsNew'
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.funds}
        model={model}
        query={`*`}
        queryType="fund"
        table="deals"
        type="fund"
      />
    </div>
  );
}
