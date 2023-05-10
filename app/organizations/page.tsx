'use client';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';

export default function Organizations() {
  const header = {
    name: 'Organizations',
    description: 'Manage your organizations.',
    buttons: [
      {
        title: 'Create new',
        action: 'modal'
      }
    ]
  };

  const dialog = {
    element: 'organization',
    model: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        show: true
      }
    ],
    table: 'organizations',
    type: 'FormsNew'
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.organizations}
        query={`*, organizations (*)`}
        table="organizations_roles"
        target="organizations"
        type="organization"
      />
    </div>
  );
}
