import Button from '@/components/Button';
import DateComponent from '@/components/DateComponent';
import Price from '@/components/Price';
import { Deal } from '@/types';
import { Alert } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import InvestmentsModule from './Module';

export default function InvestmentSidebar({
  deal,
  demo = false
}: {
  deal: Deal;
  demo?: boolean;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [investing, setInvesting] = useState<boolean>(false);

  const dealInformations = [
    {
      label: 'Minimum investment',
      value: deal.minimum_investment,
      type: 'money'
    },
    {
      label: 'Signing deadline',
      value: deal.closing_date,
      type: 'date'
    },
    {
      label: 'Wiring deadline',
      value: deal.wire_deadline,
      defaultValue: 'No wire deadline',
      type: 'date'
    },
    {
      label: 'Offering type',
      value: deal.offering_type,
      defaultValue: 'No offering type.',
      type: 'string'
    },
    {
      label: 'Fee Frequency',
      value: deal.management_fee_frequency,
      defaultValue: 'No fee frequency.',
      type: 'string'
    },
    {
      label: 'Management fee',
      value: deal.management_fee_percent || 0,
      type: 'percent'
    },
    {
      label: 'Total carry fee',
      value: deal.total_carry || 0,
      type: 'percent'
    }
  ];

  const canInvest = () => {
    const conditions = [
      () => deal?.documents_template_id,
      () =>
        ['onboarding', 'closing'].includes(String(deal.status).toLowerCase())
    ];
    return conditions.every((condition) => condition());
  };

  return (
    <div className="sticky self-start w-full bg-white rounded-md shadow top-8">
      <header className="px-6 py-4">
        <h2 className="text-lg font-bold">Invest</h2>
        <p className="flex items-center gap-1 text-sm">
          Minimum is <Price price={deal.minimum_investment} /> - invest by{' '}
          <DateComponent date={deal.closing_date} />
        </p>
      </header>
      <div className="relative grid px-6 py-1">
        <div className="flex items-center input">
          <div className="px-2 py-1 mr-2 bg-gray-100 rounded">$</div>
          <input
            type="number"
            className="w-full outline-0 ring-0"
            placeholder="0"
            onChange={(e: any) => setAmount(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div>
        {demo && (
          <div className="px-6 py-3 mb-4">
            <Alert severity="success">
              You are in demo mode. Investing module is displayed here for
              client.
            </Alert>
          </div>
        )}
        {!investing && (
          <div>
            {!demo && (
              <div className="grid w-full px-6 py-3">
                {deal.closing_date && (
                  <Button
                    loading={false}
                    disabled={!canInvest()}
                    label={'Invest'}
                    onClick={() => setInvesting(true)}
                  />
                )}
              </div>
            )}
            <ul className="divide-y divide-gray-200">
              {dealInformations.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <h3 className="text-sm font-semibold">{item.label}</h3>
                  <p className="text-sm">
                    {item.type === 'string' && (
                      <div>
                        {item.value ? (
                          <p>{item.value}</p>
                        ) : (
                          <span>{item.defaultValue}</span>
                        )}
                      </div>
                    )}
                    {item.type === 'money' && <Price price={item.value} />}
                    {item.type === 'date' && (
                      <DateComponent date={item.value} />
                    )}
                    {item.type === 'percent' && (
                      <div className="flex">
                        <span>{item.value || 0}</span>
                        <Image
                          src="/percent.svg"
                          alt={'Percent'}
                          className="opacity-50 cursor-pointer text-primary"
                          width={18}
                          height={18}
                        />
                      </div>
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <p className="px-6 py-2 mt-1 text-xs">View Closing Docs</p>
          </div>
        )}
        {investing && (
          <div className="mt-4">
            <InvestmentsModule deal={deal} amount={amount} />
          </div>
        )}
      </div>
    </div>
  );
}
