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

  const isAdmin = () =>
    deal && user && deal.user_email === user.email ? true : false;

  async function fetchDeal() {
    if (!params || !params.id) return;

    const queryFrom = 'deals';
    const querySelect = isAdmin() ? `*, assets(*)` : '*';

    try {
      setLoading(true);
      const { data: _deal, error } = await supabase
        .from(queryFrom)
        .select(querySelect)
        .eq('id', params.id)
        .single();

      if (error) {
        throw error;
      }

      if (_deal) {
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
  }, []);

  return (
    <div className="w-full deal">
      {loading && <LoadingDeal />}
      {!loading && !deal && <None text="No deal found." />}
      {!loading && deal && (
        <div>
          {isAdmin() && <AdminDeal deal={deal} />}
          {!isAdmin() && <ClientDeal deal={deal} />}
        </div>
      )}
    </div>
  );
}
