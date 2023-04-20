import { Card, Text, Title } from '@tremor/react';
import Search from '../../components/search';
export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Fund-GPT</Title>
      <img src="https://i.ibb.co/hKsGjCP/Concept-Mock-1.png" width={1000} height={1000} />
      <Card className="mt-6">
      </Card>
    </main>
  );
}
