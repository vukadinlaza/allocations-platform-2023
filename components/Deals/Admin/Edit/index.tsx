'use client';
import { useAuthContext } from '@/app/context';
import Checkbox from '@/components/Checkbox';

import SelectBank from '@/components/Bank/Select';
import Button from '@/components/Button';
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
  const [agree, setAgree] = useState<boolean>(false);
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
          <Step
            selected={false}
            component={
              <SelectBank
                loading={loading}
                onSave={saveDeal}
                onChange={(bank_account_id: any) => {
                  setNewDeal((prev) => ({ ...prev, bank_account_id }));
                }}
              />
            }
          />
          <Step
            selected={agree}
            component={
              <div>
                <h1>E-sign & submit</h1>
                <Checkbox
                  selected={agree}
                  onChange={() => setAgree(!agree)}
                  label={`I agree to the Master Services agreement.`}
                />
                <span className="cta">Download Master Services Agreement</span>
              </div>
            }
          />
          <div className="flex items-center justify-end gap-4">
            <p className="text-sm">
              To submit your deal for review, please fill in all the required
              fields before submitting the form. Thank you.
            </p>
            {/* <Button loading={loading} label="Save my deal" onClick={saveDeal} /> */}
            <Button
              disabled={!agree}
              loading={loading}
              label="Submit my deal"
              onClick={() => {}}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
