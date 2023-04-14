'use client';

import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';
import { Database } from './database.types';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
const useSupabase = () => {
  const { data } = useSession();

  const options: SupabaseClientOptions<any> = {};

  if (data?.supabaseAccessToken) {
    options.global = {
      headers: {
        //@ts-ignore
        Authorization: `Bearer ${data.supabaseAccessToken}`
      }
    };
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
    options
  );
};

export { useSupabase };
