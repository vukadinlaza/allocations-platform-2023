'use client';

import { useAuthContext } from '@/app/(private)/context';
import AdminDeal from '@/components/Deals/Admin';
import ClientDeal from '@/components/Deals/Client';
import LoadingDeal from '@/components/Loading/Deal';
import None from '@/components/None';
import { useSupabase } from '@/lib/supabase-provider';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DealID() {
  const { supabase } = useSupabase();
  const { user } = useAuthContext();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasRole, setHasRole] = useState<boolean>(false);
  const params = useParams();

  async function fetchDeal() {
    if (!params || !params.id) return;

    try {
      setLoading(true);

      const { data: _deal, error } = await supabase
        .from('deals')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        throw error;
      }

      const isOwner =
        user.organizations_roles
          .map((org: any) => org.organization_id)
          .includes(_deal.organization_id) || _deal.user_email === user.email;

      if (_deal) {
        setHasRole(isOwner);
        setDeal(_deal);
      }

      if (isOwner) {
        const { data: private_deal } = await supabase
          .from('private_deals')
          .select('*')
          .eq('id', params.id)
          .single();

        if (private_deal) {
          setDeal((prev: any) => ({
            ...private_deal,
            ...prev
          }));
        }
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeal();
  }, []);

  useEffect(() => {
    if (deal) {
      const watchForDeal = supabase
        .channel('deals_subscribers')
        .on(
          // @ts-ignore
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'deals',
            filter: `id=eq.${deal.id}`
          },
          (payload: any) => {
            console.log(payload);
            const { eventType } = payload;
            const newElement: any = payload.new;
            if (eventType === 'UPDATE') {
              const { status } = newElement;
              if (status !== deal.status) {
                setDeal((prev: any) => ({
                  ...prev,
                  status
                }));
              }
            }
          }
        )
        .subscribe();
    }
  }, [deal]);

  return (
    <div className="w-full deal">
      {loading && <LoadingDeal />}
      {!loading && !deal && <None text="No deal found." />}
      {!loading && deal && (
        <div>
          {hasRole && <AdminDeal deal={deal} />}
          {!hasRole && <ClientDeal deal={deal} />}
        </div>
      )}
    </div>
  );
}
