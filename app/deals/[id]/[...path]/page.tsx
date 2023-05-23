"use client";
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/supabase-provider';
import { useCallback, useEffect, useState } from 'react';
import { Deal } from '@/types';

export default function Page({ params }: { params: { id: string, path: string[] } }) {
  const router = useRouter();
  const {id: orgSlugOrId, path} = params;
  const [dealSlugOrId] = path;
  const {supabase} = useSupabase();
  const [deal, setDeal] = useState<null|Deal>(null);

  const getDeal = useCallback(async()=>{
    // attempt to find Deal by OrgId and DealId / Slug
    const {data: deal} = await supabase.from('deals')
      .select('*')
      .eq('slug',decodeURIComponent(dealSlugOrId))
      .single();
    if(deal){
      router.push(`/deals/${deal.id}`);
    }
    else{
      router.push('/404');
    }
  }, []);

  useEffect(()=>{
    void getDeal();
  }, [])


  return (<p>
    Resolving your deal link...
  </p>);
}
