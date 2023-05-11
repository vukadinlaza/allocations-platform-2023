'use client';
import PageList from '@/components/Page/List';
import { Field } from '@/types';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Organizations() {
  const { user } = useAuthContext();
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

  const model: Field[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      show: true
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      show: user.is_super_admin,
      items: ['Processing', 'Complete']
    },
    {
      key: 'mou_signed',
      label: 'MOU Signed',
      type: 'select',
      show: user.is_super_admin,
      items: [true, false]
    },
    {
      key: 'is_archvied',
      label: 'Archived',
      type: 'select',
      show: user.is_super_admin,
      items: [true, false]
    },
    {
      key: 'id',
      label: 'ID',
      type: 'string',
      show: user.is_super_admin,
      disabled: true,
      copy: true
    },
    {
      key: 'mongo_id',
      label: 'Mongo ID (deprecated)',
      type: 'string',
      show: user.is_super_admin,
      disabled: true,
      copy: true
    },
    {
      key: 'created_at',
      label: 'Creation date',
      type: 'date',
      show: user.is_super_admin,
      disabled: true,
      copy: true
    },
    {
      key: 'Slug',
      label: 'slug',
      type: 'string',
      show: user.is_super_admin,
      disabled: true,
      copy: true
    }
  ];

  const dialog = {
    element: 'organization',
    table: 'organizations',
    type: 'FormsNew'
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.organizations}
        model={model}
        query={`*, organizations (*)`}
        table="organizations_roles"
        target="organizations"
        type="organization"
      />
    </div>
  );
}
