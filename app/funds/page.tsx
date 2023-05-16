'use client';
import PageList from '@/components/Page/List';
import { Field } from '@/types';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Funds() {
  const { user } = useAuthContext();

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

  const model: Field[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      show: true
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
        table="limited_deals"
        type="fund"
      />
    </div>
  );
}
