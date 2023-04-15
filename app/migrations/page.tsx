import { Card, Text, Title } from '@tremor/react';
import Search from '../../components/search';
import Table from '@/components/tables/Table';
import MigrationForm from '@/components/forms/migration-form';

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Migrations</Title>
      <Card className="mt-6">
        <Table
          title={'Migrations'}
          description={'Manage your migrations'}
          rows={[
            {
              name: 'Allocations - Atomizer 49 SPV',
              stage: 'Red',
              amount: '9 Feb 2023',
              role: '85-238791',
              actions: {
                data: {},
                render: (row) => (
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Upload investments<span className="sr-only">{row.name}</span>
                  </a>                  
                ),
                render: (row) => (
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Review investments<span className="sr-only">{row.name}</span>
                  </a>                  
                ),     
                render: (row) => (
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit migration<span className="sr-only">{row.name}</span>
                  </a>                  
                )                                   
              }
            }
          ]}
          columns={[
            {
              name: 'name',
              label: 'Deal Display Name '
            },
            {
              name: 'stage',
              label: 'Phase'
            },
            {
              name: 'amount',
              label: 'First Close Date'
            },
            {
              name: 'role',
              label: 'EIN'
            },
            {
              name: 'actions',
              label: ''
            }
          ]}
        />
      </Card>
      <Card className='mt-6'>
        <MigrationForm />
      </Card>
    </main>
  );
}
