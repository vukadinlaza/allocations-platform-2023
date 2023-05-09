'use client';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';

export default function Funds() {
  const header = {
    name: 'Funds',
    description: 'Manage your funds.',
    buttons: [
      {
        title: 'Create new'
      }
    ]
  };

  // const dialog = {
  //   type: 'modal',
  //   component: OrganizationNew
  // };

  return (
    <div>
      <PageList
        header={header}
        headersTable={headers_tables.funds}
        table="deals"
        query={`*`}
        queryType="fund"
      />
    </div>
  );
}
