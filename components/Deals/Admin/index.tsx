'use client';

import DealEdit from '@/components/Deals/Admin/Edit';
import DealHeader from '@/components/Deals/Admin/Header';
import DealAdminBanking from '@/components/Deals/Admin/Tabs/Banking';
import DealAdminDocuments from '@/components/Deals/Admin/Tabs/Documents';
import DealAdminInvestors from '@/components/Deals/Admin/Tabs/Investors';
import Client from '@/components/Deals/Client';
import Nav from '@/components/Nav';
import None from '@/components/None';
import { Deal } from '@/types';
import { useState } from 'react';

export default function DealAdmin({ deal }: { deal?: Deal }) {
  const [active, setActive] = useState('Edit page');

  const items = [
    { key: 'Edit page' },
    { key: 'View page' },
    { key: 'Investors' },
    { key: 'Banking' },
    { key: 'Documents' }
  ];

  return (
    <div className="container mb-24 deal-admin">
      {!deal && <None text="No deal found." />}
      {deal && (
        <div>
          <DealHeader deal={deal} />
          <div className="py-4 my-6 border-b">
            <Nav
              items={items.map((item) => item.key)}
              active={active}
              setActive={setActive}
            />
          </div>
          <div>
            {active === 'Edit page' && <DealEdit deal={deal} />}
            {active === 'View page' && <Client deal={deal} />}
            {active === 'Investors' && <DealAdminInvestors deal={deal} />}
            {active === 'Banking' && <DealAdminBanking deal={deal} />}
            {active === 'Documents' && <DealAdminDocuments deal={deal} />}
          </div>
        </div>
      )}
    </div>
  );
}
