'use client'

import { Card, Text, Title } from '@tremor/react';
import Search from '../../components/search';
import Table from '@/components/tables/Table';
import TaxForm from './tax-form';
import Button from '@/components/base/Button';
import { useState } from 'react';
import ModalWrapper from '@/components/modals/modal-wrapper';

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  const [openModal, setOpenModal] = useState<boolean>(true);

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
                    <Button onClick={() => setOpenModal(!openModal)}>Manage</Button>
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
        {/* <TaxManageModal /> */}
      </Card>
      <Card className="mt-6">
        <ModalWrapper open={openModal}>
          <TaxForm />
        </ModalWrapper>
       {/* {openModal && <TaxForm />} */}
      </Card>
    </main>

  );
}
