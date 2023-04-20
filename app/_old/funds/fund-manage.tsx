import { Card, Title } from '@tremor/react';
import FundManageHeader from './fund-manage-header';
import FundManageOnboarding from './fund-manage-onboarding';
import FundManageDeal from './fund-manage-deal-page';
import FundManageTabs from './fund-manage-tabs';  

// Fund Manage: This is where the Fund Manager can manage their Fund (deal page, setup, investor onboarding etc) - kadvani
//    This opens when you click on an Fund manage button - kadvani
//    Todo: Link up to manage button

export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Manage Fund</Title>
      <Card className="mt-6">
        <FundManageHeader />
      </Card>
      <Card className="mt-6">
      </Card>
      <Card className="mt-6">
        <FundManageTabs />
      </Card>
      <Card className="mt-6">
        <FundManageDeal />
      </Card>

    </main>
  );
}
