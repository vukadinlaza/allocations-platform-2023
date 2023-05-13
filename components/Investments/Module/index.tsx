import { useState } from 'react';
import InvestmentsAccreditation from './Accreditation';
import InvestmentsIdentity from './Identity';
import InvestmentsKYC from './KYC';
import InvestmentsSign from './Sign';
export default function InvestmentsModule({ amount }: { amount: number }) {
  const [loading, setLoading] = useState<boolean>(true);
  const items = [
    {
      component: InvestmentsIdentity,
      show: true
    },
    {
      component: InvestmentsKYC,
      show: true
    },
    {
      component: InvestmentsAccreditation,
      show: true
    },
    {
      component: InvestmentsSign,
      show: true
    }
  ];
  return (
    <div className="investments-module">
      {items.map((item, index) => (
        <div key={index} className="p-6 border-t">
          <item.component />
        </div>
      ))}
    </div>
  );
}
