'use client';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';

export default function Migrations() {
  const header = {
    name: 'Migrations',
    description: 'Manage your migrations.',
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
      type: 'select',
      show: true,
      items: ['spv', 'fund']
    }
  ];

  const dialog = {
    element: 'migration',
    table: 'deals',
    type: 'FormsNew'
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.deals}
        model={model}
        query={`*`}
        isMigration={true}
        table="limited_deals"
        type="organization"
      />
    </div>
  );
}
