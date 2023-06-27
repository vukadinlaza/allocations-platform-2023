'use client';
import { useAuthContext } from '@/app/(private)/context';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import DateComponent from '@/components/DateComponent';
import DealItem from '@/components/Deals/Item';
import InvestmentsModule from '@/components/Investments/Module';
import LoadingPage from '@/components/Loading/Page';
import Money from '@/components/Money';
import None from '@/components/None';
import Price from '@/components/Price';
import UserItem from '@/components/UserItem';
import { useSupabase } from '@/lib/supabase-provider';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InvestDealID({ searchParams }: { searchParams: any }) {
  const params = useParams();
  const router = useRouter();
  const { supabase } = useSupabase();
  const { user } = useAuthContext();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  async function fetchDeal() {
    if (!params || !params.id) return;

    try {
      setLoading(true);

      const { data: _deal, error } = await supabase
        .from('deals')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      if (_deal) setDeal(_deal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const canInvest = () => {
    if (!deal) return;
    const list = [
      'draft',
      'submitted',
      'pending',
      'closed',
      'archived',
      'rejected',
      'cancelled'
    ];
    return !list.includes(deal.status);
  };

  useEffect(() => {
    fetchDeal();
    if (searchParams.amount) {
      setAmount(parseFloat(searchParams.amount));
    }
  }, []);

  return (
    <div className="mx-auto" style={{ maxWidth: 800 }}>
      {loading && <LoadingPage />}
      {!loading && !deal && <None text="No deal found." />}
      {!loading && deal && (
        <div>
          {!canInvest() && (
            <None text="Sorry, you can't invest in this deal." />
          )}
          {canInvest() && (
            <div>
              <header className="w-full px-4 mb-8">
                <div className="flex items-center justify-between pb-4">
                  {deal.name && (
                    <h1 className="mb-4">New investment in {deal.name}</h1>
                  )}
                  <Button
                    label={'Back to deal'}
                    small={true}
                    onClick={async () => router.push(`/deals/${deal.id}`)}
                    icon={
                      <Image
                        src={'/open.svg'}
                        alt="copy"
                        className="opacity-50 invert"
                        width={20}
                        height={20}
                      />
                    }
                  />
                </div>
                <div className="flex items-center gap-4">
                  <UserItem user={user} />
                  <Image
                    src="/arrow.svg"
                    className="rotate-90"
                    alt={'sort'}
                    width={28}
                    height={28}
                  />
                  <DealItem deal={deal} />
                </div>
              </header>
              {deal && (
                <div className="w-full bg-white">
                  <div className="p-6">
                    <h2 className="text-lg font-medium">
                      Select an amount to invest
                    </h2>
                    <div className="relative grid gap-2 py-1">
                      <Money amount={amount} onChange={setAmount} />
                      <p className="flex items-center gap-1 text-sm">
                        Minimum is{' '}
                        <Price price={deal.minimum_investment ?? '1'} /> -
                        closing date is{' '}
                        <DateComponent date={deal.closing_date} />
                      </p>
                    </div>
                  </div>
                  {amount < 1 && (
                    <div className="pb-4 m-4">
                      <Alert
                        color="text-amber-600 bg-amber-100 cursor-pointer hover:bg-amber-100 transition"
                        close={false}
                        content={
                          <span className="text-base font-medium">
                            You cannot invest less than the minimum amount.
                          </span>
                        }
                      />
                    </div>
                  )}
                  {amount >= 1 && (
                    <InvestmentsModule deal={deal} amount={amount} />
                  )}
                </div>
              )}
              {!deal && <None text="No deal found." />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
