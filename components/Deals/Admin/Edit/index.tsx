'use client';
import { useAuthContext } from '@/app/context';
import DealCompliance from '@/components/Deals/Admin/Edit/Compliance';
import DealEntity from '@/components/Deals/Admin/Edit/Entity';
import DealInformations from '@/components/Deals/Admin/Edit/Informations';
import DealLegalDocuments from '@/components/Deals/Admin/Edit/LegalDocuments';
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
  const [loading, setLoading] = useState<boolean>(false);

  const { notify } = useAuthContext();

  const saveDeal = async () => {
    if (!deal) return;
    try {
      setLoading(true);

      // TODO: prevent here
      delete newDeal.total_raised_amount;

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
                loading={loading}
                onSave={saveDeal}
                onChange={(org: any) => {
                  setNewDeal((prev) => ({ ...prev, organization_id: org?.id }));
                }}
              />
            }
          />
          <Step
            selected={false}
            component={
              <DealInformations
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={false}
            component={
              <DealEntity
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={false}
            component={
              <DealLegalDocuments
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={false}
            component={
              <DealCompliance
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step selected={false} component={<h1>Select a bank account</h1>} />
          <Step selected={false} component={<h1>E-sign & submit</h1>} />
        </div>
      )}
    </Card>
  );
}
