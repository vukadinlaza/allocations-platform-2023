'use client';
import PageBase from '@/components/Page/Base';
import { Deal } from '@/types';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function SPVs() {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getContent = () => {
    return {
      header: {
        name: 'SPVs',
        description: 'Manage your spvs.',
        buttons: [
          {
            title: 'Create new'
          }
        ]
      },
      headersTable: headers_tables.spvs,
      dialog: {
        component: null
      }
    };
  };

  return (
    <div>
      <PageBase
        content={getContent()}
        data={user.deals.filter((deal: Deal) => deal.type === 'spv')}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
