'use client';

import { Card, Text, Title } from '@tremor/react';
import Search from '../../components/search';
import Table from '@/components/tables/Table';
import TaxForm from './tax-form';
import Button from '@/components/_old/base/Button';
import ModalWrapper from '@/components/modals/modal-wrapper';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function IndexPage({}: {}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  function handleOpenModal() {
    setOpenModal(!openModal);
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Taxes</Title>
      <Card className="mt-6">
        <Table
          title={'Taxes'}
          description={'Manage your tax returns'}
          rows={[
            {
              name: 'Allocations - Atomizer 49 SPV',
              stage: 'Extension Filed',
              amount: '0978SN',
              role: 'Manager',
              actions: {
                data: {},
                render: (row) => (
                  <div className="mt-4 sm:ml-16 sm:mt-0 flex-none">
                    <Button onClick={handleOpenModal}>Manage</Button>
                  </div>
                )
              }
            }
          ]}
          columns={[
            {
              name: 'name',
              label: 'Deal Name'
            },
            {
              name: 'stage',
              label: 'Extension Status'
            },
            {
              name: 'amount',
              label: 'GoSystems Return ID'
            },

            {
              name: 'actions',
              label: ''
            }
          ]}
        />
      </Card>
      {openModal && (
        <Card className="mt-6">
          <TaxForm />
        </Card>
      )}
    </main>
  );
}
