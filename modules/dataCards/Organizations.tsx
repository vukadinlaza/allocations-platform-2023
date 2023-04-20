import { useEffect, useState } from 'react';
import { useSupabase } from '@/lib/supabase';
import DataCard from '@/components/_old/DataCard';

const OrganizationsDataCard = ()=>{
  const [organizationCount, setOrganizationCount] = useState(0);
  const supabase = useSupabase();
  const getOrganizationCount = async ()=> {
    const {count } = await supabase.from('Organizations').select('*', { count: 'exact', head: true });
    if(count) {
      setOrganizationCount(count);
    }
  }

  useEffect(() => {
    void getOrganizationCount();
  }, []);

  return (
    <DataCard title={"Organizations"} metric={organizationCount}/>
  );
}
export default OrganizationsDataCard;
