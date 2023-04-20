import { Card, Text, Title } from '@tremor/react';
import Search from '@/components/search';
import CustomTable from '@/components/migrations';
import CustomCard from '@/components/grid-lists/cards';

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Marketplace</Title>
      <Text></Text>
      <Search />
      <Card className="mt-6">
        <img src="https://i.ibb.co/fq1Ks7K/Screenshot-2023-04-15-at-11-48-24-AM.png" alt="" />
      </Card>
      <Card className='mt-6'>
      </Card>
    </main>
  );
}
