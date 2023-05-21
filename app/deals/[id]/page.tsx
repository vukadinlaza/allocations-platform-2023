'use client';

import { useAuthContext } from '@/app/context';
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
  const params = useParams();

  const isDealOwner = () => deal && user && deal.user_email === user.email; // fund manager deal.user_email === user.email

  useEffect(() => {
    async function fetchDeal() {
      if (!params || !params.id) return;
      try {
        setLoading(true);
        // isDealOwner? private_deals : public_deals
        const { data: _deal, error } = await supabase
          .from('deals')
          .select('*,assets(*)')
          .eq('id', params.id)
          .single();

        if (error) {
          throw error;
        }

        if (_deal) {
          console.log(_deal);
          setDeal(_deal);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDeal();
  }, []);

  return (
    <div className="w-full deal">
      {loading && <LoadingDeal />}
      {!loading && !deal && <None text="No deal found." />}
      {!loading && deal && (
        <div>
          {isDealOwner() && <AdminDeal deal={deal} />}
          {!isDealOwner() && <ClientDeal deal={deal} />}
        </div>
      )}
    </div>
  );
}
