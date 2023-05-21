'use client';
import { useAuthContext } from '@/app/context';
import KYC from '@/components/Identity/KYC';
import SelectOrganization from '@/components/Organizations/SelectOrganization';
import Step from '@/components/Step';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';

export default function DealAdminEdit({ deal }: { deal: Deal }) {
  const { user, supabase } = useSupabase();
  const [newDeal, setNewDeal] = useState<Deal>({});
  const [hasIdentity, setHasIdentity] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);

  const { notify } = useAuthContext();

  const saveDeal = async () => {
    if (!deal) return;
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('deals')
        .upsert({ id: deal.id, ...newDeal });

      if (error) {
        notify(`Sorry, could not save deal.`, false);
        return;
      }
      notify('Deal saved.', true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.users_personal_identities) {
      setHasIdentity(user.users_personal_identities.length > 0);
    }
  }, [user]);

  useEffect(() => {
    setNewDeal(deal);
  }, [deal]);

  useEffect(() => {
    console.log(newDeal);
  }, [newDeal]);

  return (
    <Card className="container grid gap-8 p-6 mt-8">
      <h1 className="pb-0 mb-0 text-2xl font-medium">Edit my deal</h1>
      {!hasIdentity && (
        <Card className="flex items-start card" variant="outlined">
          <KYC onUpdate={() => setHasIdentity(true)} />
        </Card>
      )}
      {hasIdentity && deal && (
        <div>
          <Step
            selected={newDeal.organization_id}
            component={
              <SelectOrganization
                onSave={saveDeal}
                onChange={(org: any) => {
                  setNewDeal((prev) => ({ ...prev, organization_id: org?.id }));
                }}
              />
            }
          />
          {/* <SelectOrganization deal={deal} />
          <DealInformations deal={deal} />
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
          </Card> */}
        </div>
      )}
    </Card>
  );
}
