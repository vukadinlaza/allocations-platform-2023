import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types';

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string ?? process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string ?? process.env.NEXT_PUBLIC_SUPABASE_KEY as string
)
