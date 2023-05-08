'use client';
import PageBase from '@/components/Page/Base';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Entities() {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getContent = () => {
    return {
      header: {
        name: 'Entities',
        description: 'Manage your entities.',
        buttons: [
          {
            title: 'Create new'
          }
        ]
      },
      headersTable: headers_tables.entities,
      dialog: {
        component: null
      }
    };
  };

  return (
    <div>
      <PageBase
        content={getContent()}
        data={user.entities}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
