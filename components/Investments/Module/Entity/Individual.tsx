import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import { useState } from 'react';
import KYC from '@/components/Identity/KYC';

export default function NewIndividual({ onUpdate }: { onUpdate: () => void }) {
  const [newCompany, setNewCompany] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const saveNewEntity = async () => {
    if (!newCompany.name) return alert('Please enter a name');
    try {
      setLoading(true);
      const { data } = await supabase
        .from('identities')
        .insert({ name: newCompany.name, type: 'Individual' })
        .select();

      if (data) {
        onUpdate();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new--individual">
      <KYC onUpdate={onUpdate} />
    </div>
  );
}
