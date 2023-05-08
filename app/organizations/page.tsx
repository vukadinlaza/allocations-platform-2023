'use client';
import OrganizationForm from '@/components/Organizations/Form';
import PageBase from '@/components/Page/Base';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Organizations() {
  const { user } = useAuthContext();

  const getContent = () => {
    return {
      header: {
        name: 'Organizations',
        description: 'Manage your organizations.',
        buttons: [
          {
            title: 'Create new',
            action: 'modal'
          }
        ]
      },
      headersTable: headers_tables.organizations,
      dialog: {
        type: 'modal',
        component: OrganizationForm
      }
    };
  };

  return (
    <div>
      <PageBase
        content={getContent()}
        data={user.organizations}
      />
    </div>
  );
}
