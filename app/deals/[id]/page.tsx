'use client';

import { useAuthContext } from '@/app/context';
import AdminDeal from '@/components/Deals/Admin';
import ClientDeal from '@/components/Deals/Client';
import LoadingDeal from '@/components/Loading/Deal';
import None from '@/components/None';
import { useSupabase } from '@/lib/supabase-provider';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function DealID() {
  const { supabase } = useSupabase();
  const { user } = useAuthContext();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasRole, setHasRole] = useState<boolean>(false);
  const params = useParams();

  const isAdmin = useCallback( () => {
    return !!(deal && user && deal.user_email === user.email || hasRole);
  }, [user, deal, supabase]);


  async function fetchDeal() {
    if (!params || !params.id) return;

    const queryFrom = isAdmin() ? 'private_deals' : 'deals';
    const querySelect =  isAdmin() ? `*, assets(*)` : '*';


    try {
      setLoading(true);
      const { data: _deal, error } = await supabase
        .from(queryFrom)
        .select(querySelect as "*, assets(*)")
        .eq('id', params.id)
        .single();

      if (error) {
        throw error;
      }

      if (_deal) {
        setDeal(_deal);
      }

      const { data: role } = await supabase
        .from('organizations_roles')
        .select('*')
        .eq('organization_id', _deal.organization_id)
        .eq('user_email', user.email)
        .single();
      if(role){
        setHasRole(true);
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
    <div className='w-full deal'>
      {loading && <LoadingDeal />}
      {!loading && !deal && <None text='No deal found.' />}
      {!loading && deal && (
        <div>
          {isAdmin() && <AdminDeal deal={deal} />}
          {!isAdmin() && <ClientDeal deal={deal} />}
        </div>
      )}
    </div>
  );
}
