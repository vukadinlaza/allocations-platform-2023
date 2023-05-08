import { fetchOrganizations } from '@/lib/supabase';

export default async function Organizations() {
  const { data: organizations } = await fetchOrganizations();

  return <div>hello</div>;
}
