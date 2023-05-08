'use client';
import PageBase from '@/components/Page/Base';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Deals() {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getContent = () => {
    return {
      header: {
        name: 'Deals',
        description: 'Manage your deals.',
        buttons: [
          {
            title: 'Create new'
          }
        ]
      },
      headersTable: headers_tables.deals,
      dialog: {
        component: null
      }
    };
  };

  return (
    <div>
      <PageBase
        content={getContent()}
        data={user.deals}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
