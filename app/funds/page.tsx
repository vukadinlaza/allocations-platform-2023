'use client';
import PageBase from '@/components/Page/Base';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';
import { Deal } from "@/types"

export default function Funds() {
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getContent = () => {
    return {
      header: {
        name: 'Funds',
        description: 'Manage your funds.',
        buttons: [
          {
            title: 'Create new'
          }
        ]
      },
      headersTable: headers_tables.funds,
      dialog: {
        component: null
      }
    };
  };

  return (
    <div>
      <PageBase
        content={getContent()}
        data={user.deals.filter((deal: Deal) => deal.type === 'fund')}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
