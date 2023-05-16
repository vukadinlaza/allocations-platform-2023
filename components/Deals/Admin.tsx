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
  const [active, setActive] = useState('View page');
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
                    {(deal.total_raised_amount && (
                      <Price price={deal.total_raised_amount} />
                    )) ||
                      '$0'}
                  </div>
                </div>
                <div>
                  <p>Funds goal</p>
                  <div className="text-xl font-bold">
                    {(deal.target_raise_goal && (
                      <Price price={deal.target_raise_goal} />
                    )) ||
                      '$0'}
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
            {active === 'Progress' && <DealAdminProgress deal={deal} />}
            {active === 'Investors onboarding status' && (
              <DealAdminOnboarding deal={deal} />
            )}
            {active === 'Investors' && <DealAdminInvestors deal={deal} />}
            {active === 'Banking' && <DealAdminBanking deal={deal} />}
            {active === 'Documents' && <DealAdminDocuments deal={deal} />}
            {active === 'View page' && <Client deal={deal} demo />}
          </div>
        </div>
      )}
    </div>
  );
}
