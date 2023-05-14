'use client';

import ClientDeal from '@/components/Deals/Client';
import LoadingDeal from '@/components/Loading/Deal';
import None from '@/components/None';
import { useSupabase } from '@/lib/supabase-provider';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DealID() {
  const { supabase } = useSupabase();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    async function fetchDeal() {
      if (!params || !params.id) return;
      try {
        setLoading(true);
        const { data: _deal, error } = await supabase
          .from('hydrated_deals')
          .select('*')
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

    fetchDeal();
  }, []);

  return (
    <div className="w-full deal">
      {loading && <LoadingDeal />}
      {!loading && !deal && <None text="No deal found." />}
      {!loading && deal && (
        <div>
          <ClientDeal deal={deal} />
        </div>
      )}
    </div>
  );
}
