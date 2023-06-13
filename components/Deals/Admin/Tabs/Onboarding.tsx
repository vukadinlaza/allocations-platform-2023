import AvatarItem from '@/components/Items/Avatar';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Price from '@/components/Price';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { investments_status } from '@/types/values';
import { useEffect, useState } from 'react';

export default function DealAdminOnboarding({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [investors, setInvestors] = useState<null[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInvestors = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data: investments, error } = await supabase
        .from('investments')
        .select('*, users(*)')
        .eq('deal_id', deal.id);

      if (investments) {
        setInvestors(
          investments.map((invest) => ({
            ...invest.users,
            status: invest.status,
            amount: invest.subscription_amount
          }))
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvestors();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && !investors.length && <None text="No investors yet." />}
      <div className="grid grid-cols-3 gap-4">
        {!loading &&
          investors.length > 0 &&
          investments_status.map((status, index) => (
            <div className="border rounded" key={index}>
              <header className="p-4 border-b">
                <p className="capitalize">{status}</p>
              </header>
              <div>
                {!investors && <None text="No investors yet." />}
                {investors &&
                  investors
                    .filter((x: any) => x.status === status)
                    .map((investor: any, investorIndex: number) => (
                      <div
                        className="flex items-center justify-between gap-2 px-3 py-4"
                        key={investorIndex}
                      >
                        <AvatarItem
                          item={`${investor.first_name} ${investor.last_name}`}
                        />
                        <p className="text-xs">
                          <Price price={investor.amount} />
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
