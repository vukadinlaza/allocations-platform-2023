import { Card, Title } from '@tremor/react';
import Search from '../../components/search';
import SPVTable from '@/components/tables/SPVTable';

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>SPVs</Title>
      <Card className="mt-6">
        <SPVTable />
      </Card>
    </main>
  );
}
