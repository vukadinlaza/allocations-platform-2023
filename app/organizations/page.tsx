'use client';
import OrganizationForm from '@/components/Organizations/Form';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Organizations() {
  const { user, organizations } = useAuthContext();

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
    component: OrganizationForm
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.organizations}
        table="organizations"
        query={`*, entities ( * )`}
      />
    </div>
  );
}
