'use client';
import { useAuthContext } from '@/app/context';
import Checkbox from '@/components/Checkbox';

import NewAsset from '@/components/Assets/New';
import Button from '@/components/Button';
import DealBanking from '@/components/Deals/Admin/Edit/Banking';
import DealCompliance from '@/components/Deals/Admin/Edit/Compliance';
import DealEntity from '@/components/Deals/Admin/Edit/Entity';
import DealEstimatedCosts from '@/components/Deals/Admin/Edit/EstimatedCost';
import DealInformations from '@/components/Deals/Admin/Edit/Informations';
import DealLegalDocuments from '@/components/Deals/Admin/Edit/LegalDocuments';
import DealProductType from '@/components/Deals/Admin/Edit/ProductType';
import KYC from '@/components/Identity/KYC';
import SelectOrganization from '@/components/Organizations/SelectOrganization';
import Step from '@/components/Step';
import { useSupabase } from '@/lib/supabase-provider';
import { Asset, Deal } from '@/types';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';

export default function DealAdminEdit({ deal }: { deal: Deal }) {
  const { user, supabase } = useSupabase();
  const [newDeal, setNewDeal] = useState<any>();
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
      delete newDeal.assets;

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
    console.log(deal);
    setNewDeal(deal);
  }, [deal]);

  return (
    <Card className="container grid gap-8 p-6 mt-8">
      <h1 className="pb-0 mb-0 text-2xl font-medium">Deal Setup Form</h1>
      {!hasIdentity && (
        <Card className="flex items-start card" variant="outlined">
          <KYC onUpdate={() => setHasIdentity(true)} />
        </Card>
      )}
      {hasIdentity && deal && newDeal && (
        <div>
          <Step
            selected={newDeal.organization_id || false}
            component={
              <SelectOrganization
                loading={loading}
                onSave={saveDeal}
                onChange={(org: any) => {
                  setNewDeal((prev: any) => ({
                    ...prev,
                    organization_id: org?.id
                  }));
                }}
              />
            }
          />
          {newDeal.type === 'spv' && (
            <Step
              selected={newDeal.sub_type}
              component={
                <DealProductType
                  loading={loading}
                  deal={newDeal}
                  onSave={saveDeal}
                  onChange={(sub_type: string) => {
                    setNewDeal((prev: any) => ({
                      ...prev,
                      sub_type
                    }));
                  }}
                />
              }
            />
          )}
          <Step
            selected={false}
            component={
              <DealInformations
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev: any) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={newDeal.assets && newDeal.assets[0]}
            component={
              <div className="w-full">
                <header className="flex flex-col items-start mb-4">
                  <h2 className="text-xl">Create a new asset</h2>
                </header>
                <NewAsset
                  asset={newDeal.assets ? newDeal.assets[0] : null}
                  dealId={deal.id}
                  onCreate={(asset: Asset) => {
                    setNewDeal((prev: any) => ({
                      ...prev,
                      assets: prev.assets ? [...prev.assets, asset] : [asset]
                    }));
                  }}
                />
              </div>
            }
          />
          <Step
            selected={newDeal.master_series && newDeal.series_name}
            component={
              <DealEntity
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev: any) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={newDeal.legal_template_option}
            component={
              <DealLegalDocuments
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev: any) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={newDeal.offering_type && newDeal.advisor_type}
            component={
              <DealCompliance
                loading={loading}
                deal={newDeal}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev: any) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={newDeal.banking_provider}
            component={
              <DealBanking
                deal={newDeal}
                loading={loading}
                onSave={saveDeal}
                onChange={(_deal: any) => {
                  setNewDeal((prev: any) => ({ ...prev, ..._deal }));
                }}
              />
            }
          />
          <Step
            selected={true}
            component={<DealEstimatedCosts deal={newDeal} />}
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
              disabled={true} // !agree
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
