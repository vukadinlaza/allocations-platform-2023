'use client';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';

export default function Investments() {
  const header = {
    name: 'Investments',
    description: 'Manage your investments.',
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
        headersTable={headers_tables.investments}
        table="investments"
        query={`*`}
        type="investment"
      />
    </div>
  );
}
