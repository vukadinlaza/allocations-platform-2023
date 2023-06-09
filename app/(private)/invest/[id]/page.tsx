'use client';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import DateComponent from '@/components/DateComponent';
import DealItem from '@/components/Deals/Item';
import InvestmentsModule from '@/components/Investments/Module';
import LoadingPage from '@/components/Loading/Page';
import None from '@/components/None';
import Price from '@/components/Price';
import UserItem from '@/components/UserItem';
import { useSupabase } from '@/lib/supabase-provider';
import { Alert, Card } from '@mui/material';
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

      // setAmount(_deal.minimum_investment);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeal();
    if (searchParams.amount) {
      setAmount(parseFloat(searchParams.amount));
      console.log(parseFloat(searchParams.amount));
    }
  }, []);

  return (
    <div className="mx-auto" style={{ maxWidth: 800 }}>
      {loading && <LoadingPage />}
      {!loading && !deal && <None text="No deal found." />}
      {!loading && deal && (
        <div>
          <header className="w-full px-4 mb-8">
            <div className="flex items-center justify-between mb-6">
              {deal.name && <h1 className="mb-0">New investment</h1>}
              <Button
                label={'Back to deal'}
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
            <Card className="w-full bg-white">
              <div className="p-6">
                <h2 className="text-lg font-bold">Select an amount</h2>
                <div className="relative grid py-1">
                  <div className="flex items-center mb-4 input">
                    <div className="px-2 py-1 mr-2 bg-gray-100 rounded">$</div>
                    <input
                      value={amount}
                      type="text"
                      className="w-full bg-transparent money outline-0 ring-0"
                      placeholder="0"
                      onChange={(e: any) =>
                        setAmount(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <p className="flex items-center gap-1 text-sm">
                    Minimum is <Price price={deal.minimum_investment ?? '1'} />{' '}
                    - invest by <DateComponent date={deal.closing_date} />
                  </p>
                </div>
              </div>
              {amount < 1 && (
                <div className="p-6">
                  <Alert severity="warning">
                    You cannot invest less than the minimum amount.
                  </Alert>
                </div>
              )}
              {amount >= 1 && <InvestmentsModule deal={deal} amount={amount} />}
            </Card>
          )}
          {!deal && <None text="No deal found." />}
        </div>
      )}
    </div>
  );
}
