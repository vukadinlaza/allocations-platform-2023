'use client';
import FundManagerDashboard from '@/components/Dashboards/FundManager';
import InvestorDashboard from '@/components/Dashboards/Investor';
import { investor_types } from '@/types/values';
import { useEffect, useState } from 'react';
import { useAuthContext } from './context';

export default function Dashboard() {
  const [active, setActive] = useState(investor_types[1]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const { investor_type } = user;
      if (investor_type) setActive(investor_type);
    }
  }, []);

  return (
    <div className="container py-4 home">
      {active === investor_types[1] && (
        <FundManagerDashboard
          handleSwitch={() => setActive(investor_types[0])}
        />
      )}
      {active === investor_types[0] && (
        <InvestorDashboard handleSwitch={() => setActive(investor_types[1])} />
      )}
    </div>
  );
}
