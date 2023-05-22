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
  const [isAdmin, setIsAdmin] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();

  async function fetchDeal() {
    if (!params || !params.id) return;
    try {
      setLoading(true);
      // isAdmin? private_deals : public_deals
      const { data: _deal, error } = await supabase
        .from('deals')
        .select('*')
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

  useEffect(() => {
    fetchDeal();
    setIsAdmin(deal && user && deal.user_email === user.email);
  }, []);

  return (
    <div className="w-full deal">
      {loading && <LoadingDeal />}
      {!loading && !deal && <None text="No deal found." />}
      {!loading && deal && (
        <div>
          {isAdmin && <AdminDeal deal={deal} />}
          {!isAdmin && <ClientDeal deal={deal} />}
        </div>
      )}
    </div>
  );
}
