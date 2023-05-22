'use client';

import Button from '@/components/Button';
import DealAdminBanking from '@/components/Deals/Admin/Tabs/Banking';
import DealAdminDocuments from '@/components/Deals/Admin/Tabs/Documents';
import DealAdminInvestors from '@/components/Deals/Admin/Tabs/Investors';
import DealAdminEdit from '@/components/Deals/Admin/Edit';
import ItemsHeader from '@/components/Items/Header';
import Progress from '@/components/Items/Progress';
import Nav from '@/components/Nav';
import None from '@/components/None';
import Price from '@/components/Price';
import { Deal } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import Client from '../Client';

export default function DealAdmin({ deal }: { deal?: Deal }) {
  const [active, setActive] = useState('View page');
  const items = [
    { key: 'Edit page' },
    { key: 'View page' },
    { key: 'Investors' },
    { key: 'Banking' },
    { key: 'Documents' }
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
          <div className="flex items-start justify-between">
            <ItemsHeader data={deal} />
            <Button
              loading={false}
              disabled={true}
              label={'Invite'}
              onClick={() => {}}
              icon={
                <Image
                  src={'/invite.svg'}
                  alt="invite"
                  className="opacity-50 invert"
                  width={20}
                  height={20}
                />
              }
            />
          </div>
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
            {active === 'Edit page' && <DealAdminEdit deal={deal} />}
            {active === 'View page' && <Client deal={deal} demo />}
            {active === 'Investors' && <DealAdminInvestors deal={deal} />}
            {active === 'Banking' && <DealAdminBanking deal={deal} />}
            {active === 'Documents' && <DealAdminDocuments deal={deal} />}
          </div>
        </div>
      )}
    </div>
  );
}
