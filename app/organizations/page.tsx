'use client';
import OrganizationNew from '@/components/Organizations/New';
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
    type: 'modal',
    component: OrganizationNew
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.organizations}
        table="organizations_roles"
        query={`*, organizations (*)`}
        target="organizations"
        type="organization"
      />
    </div>
  );
}
