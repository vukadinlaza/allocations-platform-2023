'use client';
import { Card, Title } from '@tremor/react';
import Table from '@/components/tables/Table';
import SPVForm from './spv-build-form';
import SPVForm2 from './spv-build-form2';
import SPVManage from './spv-manage';

// SPV Dashboard (All users): This is where users can create and manage SPVs on the platform  - kadvani
//    Todo: Make Create SPV modal on click of the Create new button - kadvani
//    Todo: Open a new page for the SPV Manage page on click of Manage SPV - kadvani


export default async function SpvsPage(): Promise<JSX.Element> {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>SPVs</Title>
      <Card className="mt-6">
        <Table
          title={'SPVs'}
          description={'Create and manage special purpose vehicles (SPVs).'}
          rows={[
            {
              name: 'Allocations - Atomizer 49 SPV',
              stage: 'Onboarding',
              amount: '$1,000,000',
              role: 'Manager',
              actions: {
                data: {},
                render: (row) => (
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">{row.name}</span>
                  </a>
                )
              }
            }
          ]}
          columns={[
            {
              name: 'name',
              label: 'Name'
            },
            {
              name: 'stage',
              label: 'Stage'
            },
            {
              name: 'amount',
              label: 'Amount'
            },
            {
              name: 'role',
              label: 'Role'
            },
            {
              name: 'actions',
              label: ''
            }
          ]}
        />
      </Card>
      <Card className="mt-6">
         <Title>Create new SPV</Title>
       {/* <img src="https://i.ibb.co/rmSZjqn/Screenshot-2023-04-15-at-6-54-23-PM.png" alt="" /> */}
      </Card>
      <Card className="mt-6" >
        <SPVForm2 />
      </Card>
      <Card className="mt-6" >
        <SPVForm />
      </Card>
      <Card className="mt-6" >
        <SPVManage />
      </Card>
    </main>
  );
}
