import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export const fetchUser = async (email: string | undefined) => {
  if (!email) return;
  const { data } = await supabase
    .from('users')
    .select(`*`)
    .eq('email', email)
    .single();
  return data || null;
};

export const fetchOrganizations = async () => {
  const { data: organizations } = await supabase
    .from('organizations')
    .select(`*`);
  return organizations || [];
};

export const fetchEntities = async () => {
  const { data: entities } = await supabase.from('deals').select(`*`);
  return entities || [];
};

export const fetchDeals = async () => {
  const { data: deals } = await supabase.from('deals').select(`*`);
  return deals || [];
};
