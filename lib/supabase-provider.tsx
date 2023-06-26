'use client';
import { Deal } from '@/types';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type SupabaseContext = {
  supabase: SupabaseClient<any>;
  [key: string]: any;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const fetchUser = async (email: string | undefined) => {
    if (!email) return;
    const { data } = await supabase
      .from('users')
      .select(
        `*,
        investments (
          *
        ),
        identities (
          *,
          accreditations (
            *
          ),
          identities (
            *
          )
        ),
        organizations_roles (
          *
        )
      `
      )
      .eq('email', email)
      .single();
    return data || null;
  };

  const fetchOrganizations = async () => {
    return supabase
      .from('organizations')
      .select(`*, organizations_roles(*, users(*))`)
      .order('created_at', { ascending: false });
  };

  const fetchIdentities = async () => {
    return await supabase.from('identities').select('*');
  };

  const fetchEntities = async () => {
    return supabase.from('entities').select(`*`, { count: 'exact' });
  };

  const fetchDeals = async (type: string | null = null) => {
    if (type) {
      return supabase
        .from('private_deals')
        .select(`*`, { count: 'exact' })
        .eq('type', type);
    }
    return supabase.from('deals').select(`*`, { count: 'exact' });
  };

  const fetchMasterSeries = async () => {
    return supabase.from('master_series').select('*');
  };

  const fetchInvestments = async () => {
    return supabase
      .from('investments')
      .select(`*, deal_id(*)`, { count: 'exact' });
  };

  const saveDeal = async (deal: Deal) => {
    return await supabase.from('deals').upsert(deal).select();
  };

  const saveDealDetails = async (deal: Deal) => {
    return await supabase.from('deal_details').upsert(deal).select();
  };

  const saveInvoice = async (invoice: any) => {
    return await supabase.from('invoices').upsert(invoice).select();
  };

  const updateUser = async (newUser: any) => {
    if (!newUser) return;

    const { data } = await supabase
      .from('users')
      .upsert(newUser, { onConflict: 'email' })
      .select();

    return data || null;
  };
  const supabaseContext = useMemo(
    () => ({
      supabase,
      fetchUser,
      fetchIdentities,
      fetchOrganizations,
      fetchEntities,
      fetchDeals,
      fetchMasterSeries,
      fetchInvestments,
      saveDeal,
      saveDealDetails,
      saveInvoice,
      updateUser
    }),
    [supabase]
  );

  return (
    <Context.Provider value={supabaseContext}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
