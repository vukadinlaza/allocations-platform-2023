'use client';

import type { Database } from '@/lib/database.types';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
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
        users_investment_entities (
          *,
          accreditations (
            *
          )
        ),
        users_personal_identities (
          *
        )
      `
      )
      .eq('email', email)
      .single();
    return data || null;
  };

  const fetchOrganizations = async () => {
    return await supabase
      .from('organizations')
      .select(`*`)
      .order('created_at', { ascending: false });
  };

  const fetchEntities = async () => {
    return await supabase.from('entities').select(`*`, { count: 'exact' });
  };

  const fetchDeals = async (type: string | null = null) => {
    if (type) {
      return await supabase
        .from('deals')
        .select(`*`, { count: 'exact' })
        .eq('type', type);
    }
    return await supabase.from('deals').select(`*`, { count: 'exact' });
  };

  const fetchInvestments = async () => {
    return await supabase.from('investments').select(`*`, { count: 'exact' });
  };

  return (
    <Context.Provider
      value={{
        supabase,
        fetchUser,
        fetchOrganizations,
        fetchEntities,
        fetchDeals,
        fetchInvestments
      }}
    >
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
