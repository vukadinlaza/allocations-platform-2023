'use client';
import Button from '@/components/Button';
import DateComponent from '@/components/DateComponent';
import Price from '@/components/Price';
import { Deal } from '@/types';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InvestmentSidebar({ deal }: { deal: Deal }) {
  const [amount, setAmount] = useState<number>(deal.minimum_investment || 0);
  const router = useRouter();
  const params = useSearchParams();

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
    // {
    //   label: 'Wiring deadline',
    //   value: deal.wire_deadline,
    //   defaultValue: 'No wire deadline',
    //   type: 'date'
    // },
    {
      label: 'Offering type',
      value: deal.offering_type,
      defaultValue: 'No offering type.',
      type: 'string'
    },
    {
      label: 'Management fee frequency',
      value: deal.management_fee_frequency,
      defaultValue: 'No fee frequency.',
      type: 'string'
    },
    {
      label: 'Management fee',
      // @ts-ignore
      value: (deal.management_fee_percent * 100).toFixed(0),
      type: 'percent'
    },
    {
      label: 'Total carry fee',
      value: Number(deal.total_carry) * 100 || 0,
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

  useEffect(() => {
    const am = params?.get('amount');
    if (am) {
      setAmount(parseFloat(am));
    }
  }, []);

  return (
    <div className="sticky self-start w-full bg-white rounded-md shadow top-8">
      <header className="px-6 py-4">
        <h2 className="text-lg font-bold">Invest</h2>
        <p className="flex items-center gap-1 text-sm">
          Minimum is <Price price={deal.minimum_investment ?? '1'} /> - invest
          by <DateComponent date={deal.closing_date} />
        </p>
      </header>
      <div className="relative grid px-6 py-1">
        <div className="flex items-center input">
          <div className="px-2 py-1 mr-2 bg-gray-100 rounded">$</div>
          <input
            value={amount || 0}
            type="text"
            className="w-full outline-0 ring-0"
            placeholder="0"
            onChange={(e: any) => setAmount(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div>
        <div>
          <div className="grid w-full px-6 py-3">
            {deal.closing_date && (
              <Button
                loading={false}
                disabled={!canInvest()}
                label={'Invest'}
                onClick={() => {
                  router.push(`/invest/${deal.id}?amount=${amount}`);
                }}
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
                        <>{item.value}</>
                      ) : (
                        <span>{item.defaultValue}</span>
                      )}
                    </div>
                  )}
                  {item.type === 'money' && <Price price={item.value} />}
                  {item.type === 'date' && <DateComponent date={item.value} />}
                  {item.type === 'percent' && (
                    <div className="flex">
                      <>
                        <span>{item.value}</span>
                        <Image
                          src="/percent.svg"
                          alt={'Percent'}
                          className="opacity-50 cursor-pointer text-primary"
                          width={18}
                          height={18}
                        />
                      </>
                    </div>
                  )}
                </p>
              </li>
            ))}
          </ul>
          {/*<p className="px-6 py-2 mt-1 text-xs">View Closing Docs</p>*/}
        </div>
      </div>
    </div>
  );
}
