'use client';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import DateComponent from '@/components/DateComponent';
import Price from '@/components/Price';
import { Deal } from '@/types';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Money from '../Money';

export default function InvestmentSidebar({ deal }: { deal: Deal }) {
  const [amount, setAmount] = useState<number>(deal.minimum_investment || 0);
  const router = useRouter();
  const params = useSearchParams();
  const { user } = useAuthContext();

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
      value: (deal.management_fee_percent * 100).toFixed(2),
      type: 'percent'
    },
    {
      label: 'Total carry fee',
      value: Number(deal.total_carry) * 100 || 0,
      type: 'percent'
    }
  ];

  const canInvest = () => {
    console.log(deal?.documents_template_id);
    const conditions = [
      () => deal?.documents_template_id,
      () =>
        ['onboarding', 'closing'].includes(String(deal.status).toLowerCase())
    ];
    return conditions.every((condition) => condition());
  };

  const hasInvested = () => {
    if (!deal || !user) return false;
    const { investments } = user;
    if (investments) {
      const currentDealInvestments = investments.filter(
        (investment: any) => investment.deal_id === deal.id
      );
      if (currentDealInvestments.length === 0) return false;
      return (
        currentDealInvestments.reduce(
          (sum: number, item: any) => sum + item.subscription_amount,
          0
        ) || 0
      );
    }
    return false;
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
        <Money onChange={setAmount} amount={amount} />
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
          {hasInvested() && (
            <div className="mx-6 mb-4">
              <div className="flex flex-col gap-1 px-3 py-2 text-xs text-gray-500 border rounded shadow-sm kyc bg-primary-500/10 border-primary-500/20">
                <span>
                  You have already invested <Price price={hasInvested()} />.
                </span>
                <span
                  className="text-xs cta"
                  onClick={() => {
                    router.push(`/investments?deal_id=${deal.id}`);
                  }}
                >
                  View your investments.
                </span>
              </div>
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
