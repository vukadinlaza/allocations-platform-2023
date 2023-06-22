'use client';

import { useAuthContext } from '@/app/(private)/context';
import Admin from '@/components/Deals/Admin';
import Client from '@/components/Deals/Client';
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
      }

      let finalDeal = _deal;

      if (isOwner) {
        const [privateDeal, dealDetails] = await Promise.all([
          supabase
            .from('private_deals')
            .select('*')
            .eq('id', params.id)
            .single(),
          supabase
            .from('deal_details')
            .select('*')
            .eq('deal_id', finalDeal.id)
            .single()
        ]);

        const dealData = privateDeal.data;
        const dealDetailsData = dealDetails.data;

        if (dealData && dealDetailsData) {
          // no mix between ids, split into deal_details_id here
          const { id, ...rest } = dealDetailsData;
          finalDeal = {
            ...finalDeal,
            ...dealData,
            ...rest,
            deal_details_id: id
          };
        }
      }

      setDeal(finalDeal);
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
            const { eventType } = payload;
            const newElement: any = payload.new;
            setDeal((prev: any) => ({
              ...prev,
              newElement
            }));
          }
        )
        .subscribe();

      const watchForDealDetails = supabase
        .channel('deals_details_subscribers')
        .on(
          // @ts-ignore
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'deal_details',
            filter: `id=eq.${deal.deal_details_id}`
          },
          (payload: any) => {
            const { eventType } = payload;
            const newElement: any = payload.new;
            // no mix between ids, split into deal_details_id here
            const { id, ...rest } = newElement;
            setDeal((prev: any) => ({
              ...prev,
              deal_details_id: id,
              ...rest,
            }));
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
          {hasRole && <Admin deal={deal} />}
          {!hasRole && <Client deal={deal} />}
        </div>
      )}
    </div>
  );
}
