'use client';
import { useSupabase } from '@/lib/supabase-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectDeal({ params }: { params: any }) {
  const router = useRouter();
  const { supabase } = useSupabase();

  const mongoDealId = params.id;

  const redirect = async () => {
    if (!mongoDealId) return;

    const { data: deal, error } = await supabase
      .from('deals')
      .select('*')
      .eq('mongo_deal_id', mongoDealId)
      .single();

    if (deal) {
      return router.replace(`deals/${deal.id}`);
    }

    return '/';
  };

  useEffect(() => {
    redirect();
  }, []);

  return <></>;
}
