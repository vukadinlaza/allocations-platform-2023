'use client';
import KYC from '@/components/Identity/KYC';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import SelectOrganization from './SelectOrganization';

export default function DealAdminEdit({ deal }: { deal: Deal }) {
  const { user } = useSupabase();
  const [hasIdentity, setHasIdentity] = useState(true);

  useEffect(() => {
    if (user && user.users_personal_identities) {
      setHasIdentity(user.users_personal_identities.length > 0);
    }
  }, [user]);
  return (
    <Card className="container grid gap-8 p-6 mt-8">
      <h1 className="pb-0 mb-0 text-2xl font-medium">Edit my deal</h1>
      {!hasIdentity && (
        <Card className="flex items-start card" variant="outlined">
          <KYC onUpdate={() => setHasIdentity(true)} />
        </Card>
      )}
      {hasIdentity && (
        <div>
          <SelectOrganization deal={deal} />
          <Card className="flex items-start card" variant="outlined">
            <h1>Complete deal informations</h1>
          </Card>
          <Card className="flex items-start card" variant="outlined">
            <h1>Select a deal entity</h1>
          </Card>
          <Card className="flex items-start card" variant="outlined">
            <h1>Add legal documents</h1>
          </Card>
          <Card className="flex items-start card" variant="outlined">
            <h1>Compliance</h1>
          </Card>
          <Card className="flex items-start card" variant="outlined">
            <h1>Select a bank account</h1>
          </Card>
          <Card className="flex items-start card" variant="outlined">
            <h1>E-sign & submit</h1>
          </Card>
        </div>
      )}
    </Card>
  );
}
