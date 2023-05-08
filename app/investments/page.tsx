'use client';
import PageBase from '@/components/Page/Base';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Investments() {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getContent = () => {
    return {
      header: {
        name: 'Investments',
        description: 'Manage your investments.',
        buttons: [
          {
            title: 'Create new'
          }
        ]
      },
      headersTable: headers_tables.investments,
      dialog: {
        component: null
      }
    };
  };

  return (
    <div>
      <PageBase
        content={getContent()}
        data={user.investments}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
