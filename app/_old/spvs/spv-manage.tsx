import { Card, Title } from '@tremor/react';
import SPVManageHeader from './spv-manage-header';
import SPVManageOnboarding from './spv-manage-onboarding';
import SPVManageDeal from './spv-manage-deal-page';
import SPVManageTabs from './spv-manage-tabs';  
import SPVManageProgress from './spv-manage-progress';

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Manage SPV</Title>
      <Card className="mt-6">
        <SPVManageHeader />
      </Card>
      <Card className="mt-6">
        <SPVManageProgress />
      </Card>
      <Card className="mt-6">
        <SPVManageTabs />
      </Card>
      <Card className="mt-6">
        <SPVManageDeal />
      </Card>

    </main>
  );
}
