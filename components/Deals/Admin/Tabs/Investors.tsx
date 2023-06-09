import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import Price from '@/components/Price';
import UserItem from '@/components/UserItem';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { uniqBy } from 'lodash';
import { useEffect, useState } from 'react';

export default function DealAdminInvestors({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(true);
  const [kanban, setKanban] = useState<any>({
    invited: [],
    signed: [],
    completed: []
  });

  const fetchInvestors = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data: investments, error } = await supabase
        .from('investments')
        .select('*, users(*)')
        .eq('deal_id', deal.id)
        .neq('status', 'archived');

      if (investments) {
        const data: any = {
          signed: [],
          completed: []
        };
        investments.forEach((investment) => {
          const { status } = investment;
          data[status.toLowerCase()].push(investment);
          setKanban((prev: any) => ({
            ...prev,
            ...data
          }));
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvitations = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data: invitations, error } = await supabase
        .from('invitations')
        .select('*, users(*)')
        .eq('deal_id', deal.id);

      if (invitations) {
        setKanban((prev: any) => ({
          ...prev,
          invited: uniqBy(invitations, 'recipient_email')
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchKanban = async () => {
    const promises = [fetchInvitations(), fetchInvestors()];
    await Promise.all(promises);
  };

  useEffect(() => {
    fetchKanban();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(kanban).map(([category, items]: any) => (
            <div className="bg-white border rounded card--popup" key={category}>
              <header className="flex justify-between">
                <h2 className="mb-0 capitalize">
                  <span className="mr-2">{category}</span>
                  <span className="chip chip--small chip--info">
                    {items.length}
                  </span>
                </h2>
                <div>
                  {category === 'completed' && (
                    <label>
                      <Price
                        price={
                          items?.reduce(
                            (sum: number, item: any) =>
                              sum + item.subscription_amount,
                            0
                          ) || 0
                        }
                      />
                    </label>
                  )}
                </div>
              </header>
              <div className="w-full px-4 py-6">
                {items.length === 0 && <None text={`No ${category} yet.`} />}
                {items.length > 0 && (
                  <div className="grid gap-2">
                    {items.map((item: any, index: number) => (
                      <div key={index}>
                        <UserItem
                          user={item.users}
                          content={
                            category === 'signed' ||
                            category === 'completed' ? (
                              <label>
                                {<Price price={item.subscription_amount} />}
                              </label>
                            ) : null
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
