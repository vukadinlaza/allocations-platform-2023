import { Card, Title, Text } from '@tremor/react';
import Search from '../search';
import UsersTable from '../table';
import CustomTable from '../../components/taxes';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
}: {
}) {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Taxes</Title>
      <Text>
        A list of tax returns
      </Text>
      <Search />
      <Card className="mt-6">
        <CustomTable />
      </Card>
      
    </main>
  );
}





