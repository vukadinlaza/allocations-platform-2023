import { Card, Title } from '@tremor/react';
import Search from '../../components/search';
import CustomTable from '../../components/taxes';
import Table from '@/components/tables/Table';
import InvestmentMetrics from './investment-metrics'

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Investments</Title>
      <Card className="mt-6">
        <InvestmentMetrics />
      </Card>
      <Card className="mt-6">
        <Table
          title={'Investments'}
          description={'Manage your investments'}
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
    </main>
  );
}
