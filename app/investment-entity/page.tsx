import { Card, Title } from '@tremor/react';
import Search from '../../components/search';
import CustomTable from '../../components/taxes';
import Table from '@/components/tables/Table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Investment Entity</Title>
      <Card className="mt-6">
        <img src="https://i.ibb.co/rmK16CK/Screenshot-2023-04-15-at-8-43-15-PM.png" alt="" />
        <img src="https://i.ibb.co/TwWrxWL/Screenshot-2023-04-15-at-8-34-33-PM.png" alt="" />
        <img src="https://i.ibb.co/Qp4qXPb/Screenshot-2023-04-15-at-8-36-28-PM.png" alt="" />
        <img src="https://i.ibb.co/N3t50Pn/Screenshot-2023-04-15-at-8-37-01-PM.png" alt="" />
        <img src="https://i.ibb.co/KzCmpy8/Screenshot-2023-04-15-at-8-38-07-PM.png" alt="" />
        <img src="https://i.ibb.co/L1jWgSy/Screenshot-2023-04-15-at-8-38-52-PM.png" alt="" />
      </Card>
      <Card className="mt-6">
        <img src="https://i.ibb.co/YNCnr5q/Screenshot-2023-04-15-at-8-39-26-PM.png" alt="" />
      </Card>
    </main>
  );
}
