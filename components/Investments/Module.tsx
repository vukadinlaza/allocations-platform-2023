import Button from '@/components/Button';
import DateComponent from '@/components/DateComponent';
import Price from '@/components/Price';
import { Deal } from '@/types';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import InvestmentsAccreditation from './Accreditation';
import InvestmentsIdentity from './Identity';
import InvestmentsKYC from './KYC';
import InvestmentsSign from './Sign';

export default function InvestmentModule({ deal }: { deal: Deal }) {
  const [amount, setAmount] = useState<number>(0);
  const [investing, setInvesting] = useState<boolean>(true);
  // const [investorStatus, investorStatus] = useState<any>(null);

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
      value: deal.management_fee || 0,
      type: 'percent'
    },
    {
      label: 'Carry fee',
      value: deal.carry_fee || 0,
      type: 'percent'
    }
  ];

  const isDatePassed = dayjs().isAfter(deal.closing_date);

  return (
    <div className="sticky self-start w-full bg-white rounded-md shadow top-8">
      <header className="px-6 py-4">
        <h2 className="text-lg font-bold">Invest</h2>
        <p className="text-sm">
          Minimum is <Price price={deal.minimum_investment} /> - invest by{' '}
          <DateComponent date={deal.closing_date} />
        </p>
      </header>
      <div className="relative grid px-6 py-1">
        <div className="flex items-center input">
          <div className="px-2 py-1 mr-2 bg-gray-100 rounded">$</div>
          <input
            type="number"
            className="w-full outline-none"
            placeholder="0"
            onChange={(e: any) => setAmount(e.target.value)}
          />
        </div>
      </div>
      {!investing && (
        <div>
          <div className="grid w-full px-6 py-3">
            {deal.closing_date && (
              <Button
                loading={false}
                disabled={isDatePassed}
                label={'Invest'}
                onClick={() => setInvesting(true)}
              />
            )}
          </div>
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
                  {item.type === 'date' && <DateComponent date={item.value} />}
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
          {/* here check all the statuses & validate steps */}
          <div className="p-6 border-t">
            <InvestmentsIdentity />
          </div>
          <div className="p-6 border-t">
            <InvestmentsKYC />
          </div>
          <div className="p-6 border-t">
            <InvestmentsAccreditation />
          </div>
          <div className="p-6 border-t">
            <InvestmentsSign />
          </div>
        </div>
      )}
    </div>
  );
}
