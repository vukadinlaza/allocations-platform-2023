'use client';
import FundManagerDashboard from '@/components/Dashboards/FundManager';
import InvestorDashboard from '@/components/Dashboards/Investor';
import { useState } from 'react';

export default function Dashboard() {
  const [active, setActive] = useState('Fund');

  return (
    <div className="container py-4 home">
      {active === 'Fund' && (
        <FundManagerDashboard handleSwitch={() => setActive('Investor')} />
      )}
      {active === 'Investor' && (
        <InvestorDashboard handleSwitch={() => setActive('Fund')} />
      )}
    </div>
  );
}
