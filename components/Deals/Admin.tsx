'use client';

import ItemsHeader from '@/components/Items/Header';
import Progress from '@/components/Items/Progress';
import { Deal } from '@/types';
import { useState } from 'react';
import Nav from '../Nav';
import None from '../None';
import Price from '../Price';
import DealAdminBanking from './Admin/Banking';
import DealAdminDocuments from './Admin/Documents';
import DealAdminInvestors from './Admin/Investors';
import DealAdminOnboarding from './Admin/Onboarding';
import DealAdminProgress from './Admin/Progress';
import Client from './Client';

export default function DealAdmin({ deal }: { deal?: Deal }) {
  const [active, setActive] = useState('Progress');
  const items = [
    { key: 'Progress' },
    { key: 'Investors onboarding status' },
    { key: 'Investors' },
    { key: 'Banking' },
    { key: 'Documents' },
    { key: 'View page' }
  ];
  const getProgress = () => {
    if (!deal) return;
    if (deal.target_raise_goal && deal.total_raised_amount) {
      return (deal.total_raised_amount / deal.target_raise_goal) * 100;
    }
    return 0;
  };
  return (
    <div className="container my-6 deal-admin">
      {!deal && <None text="No deal found." />}
      {deal && (
        <div>
          <ItemsHeader data={deal} />
          <Progress
            value={getProgress()}
            footer={
              <div className="flex items-start justify-between w-full mt-4">
                <div>
                  <p>Funds raised</p>
                  <div className="text-xl font-bold">
                    <Price price={deal.total_raised_amount} />
                  </div>
                </div>
                <div>
                  <p>Funds goal</p>
                  <div className="text-xl font-bold">
                    <Price price={deal.target_raise_goal} />
                  </div>
                </div>
              </div>
            }
          />
          <div className="py-4 my-6 border-b">
            <Nav
              items={items.map((item) => item.key)}
              active={active}
              setActive={setActive}
            />
          </div>
          <div>
            {active === 'Progress' && <DealAdminProgress />}
            {active === 'Investors onboarding status' && (
              <DealAdminOnboarding />
            )}
            {active === 'Investors' && <DealAdminInvestors />}
            {active === 'Banking' && <DealAdminBanking />}
            {active === 'Documents' && <DealAdminDocuments />}
            {active === 'View page' && <Client deal={deal} demo />}
          </div>
        </div>
      )}
    </div>
  );
}
