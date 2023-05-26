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

  const checkRole = useCallback(() => {
    if (deal && user) {
      console.log(deal.user_email === user.email);
      return deal.user_email === user.email || hasRole;
    }
    return false;
  }, [user, deal, hasRole]);

  async function fetchDeal() {
    if (!params || !params.id) return;

    const queryFrom = checkRole() ? 'private_deals' : 'deals';
    const querySelect = checkRole() ? `*, assets(*)` : '*';

    try {
      setLoading(true);
      console.log('queryFrom');
      console.log(checkRole());
      const { data: _deal, error } = await supabase
        .from(queryFrom)
        .select(querySelect as '*, assets(*)')
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
      if (role) {
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
