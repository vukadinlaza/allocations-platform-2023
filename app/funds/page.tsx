import { Card, Title } from '@tremor/react';
import Search from '../../components/search';
import CustomTable from '../../components/taxes';

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Funds</Title>
      <Search />
      <Card className="mt-6">
        <CustomTable />
      </Card>
    </main>
  );
}
