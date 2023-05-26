'use client';
import { useAuthContext } from '@/app/context';
import NewAsset from '@/components/Assets/New';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import DealBanking from '@/components/Deals/Admin/Edit/Banking';
import DealCompliance from '@/components/Deals/Admin/Edit/Compliance';
import DealEntity from '@/components/Deals/Admin/Edit/Entity';
import DealInformations from '@/components/Deals/Admin/Edit/Informations';
import DealLegalDocuments from '@/components/Deals/Admin/Edit/LegalDocuments';
import DealProductType from '@/components/Deals/Admin/Edit/ProductType';
import KYC from '@/components/Identity/KYC';
import SelectOrganization from '@/components/Organizations/SelectOrganization';
import Step from '@/components/Step';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Asset, Deal } from '@/types';
import { Card } from '@mui/material';
import { useEffect, useState } from 'react';

export default function DealAdminEdit({ deal }: { deal: Deal }) {
  const { user, supabase } = useSupabase();
  const [newDeal, setNewDeal] = useState<any>();
  const [hasIdentity, setHasIdentity] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { notify } = useAuthContext();

  const fetchDealAssets = async () => {
    // can't get assets from private_deals, so fetch & merge here
    if (!deal) return;
    try {
      setLoading(true);

      const { data: assets, error } = await supabase
        .from('assets')
        .select('*')
        .eq('deal_id', deal.id);

      if (assets) {
        setNewDeal((prev: any) => ({ ...prev, assets }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDeal = (deal: Deal, divide = true) => {
    return {
      ...deal,
      total_carry: divide
        ? parseFloat(String(deal.total_carry)) / 100
        : parseFloat(String(deal.total_carry)) * 100,
      management_fee_percent: divide
        ? parseFloat(String(deal.management_fee_percent)) / 100
        : parseFloat(String(deal.management_fee_percent)) * 100
    };
  };

  const saveDeal = async () => {
    if (!deal) return;
    try {
      setLoading(true);

      const {
        assets,
        total_raised_amount,
        series_name,
        master_series,
        legal_template_option,
        agree_msa,
        agree_setup,
        agree_costs,
        ...dealData
      } = newDeal;

      const { data: _deal, error: _dealError } = await supabase
        .from('deals')
        .upsert({ id: deal.id, ...formatDeal(dealData) });

      const { data: _dealDetails, error: _dealDetailsError } = await supabase
        .from('deal_details')
        .upsert({
          // id: deal_details.id,
          deal_id: deal.id,
          series_name,
          master_series,
          legal_template_option,
          agree_msa,
          agree_setup,
          agree_costs
        })
        .eq('deal_id', deal.id);

      if (_dealError || _dealDetailsError) {
        notify(`Sorry, could not save deal.`, false);
        return;
      }
      notify('Deal saved.', true);
      await fetchDealAssets();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadMSA = async () => {
    try {
      setLoading(true);

      const response = await AllocationsAPI.getMSADocument();

      if (response.ok) {
        await downloadFile(await response.blob(), 'spv-agreement-preview.pdf');
      } else {
        throw new Error("Can't download file");
      }
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not download document`, false);
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
    setNewDeal(formatDeal(deal, false));
    fetchDealAssets();
  }, [deal]);

  return (
    <Card className="container grid gap-8 p-6 mt-8">
      <h1 className="pb-0 mb-0 text-2xl font-medium">Deal Setup Form</h1>
      {!hasIdentity && (
        <Card className="flex items-start card" variant="outlined">
          <KYC onUpdate={() => setHasIdentity(true)} />
        </Card>
      )}
      {hasIdentity && newDeal && deal && (
        <div>
          <Step
            selected={newDeal.organization_id && newDeal.agree_msa}
            component={
              <div className="w-full">
                <div className="w-full mb-4">
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
                </div>
                <Checkbox
                  selected={newDeal.agree_msa}
                  onChange={() =>
                    setNewDeal((prev: any) => ({
                      ...prev,
                      agree_msa: true
                    }))
                  }
                  label={`I agree to the Master Services agreement.`}
                />
                <Button
                  onClick={downloadMSA}
                  label={'Download Master Services Agreement'}
                />
              </div>
            }
          />
          {newDeal.type === 'spv' && (
            <Step
              selected={newDeal.sub_type || deal.sub_type}
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
            selected={newDeal.name}
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
          {newDeal && newDeal.assets && (
            <Step
              selected={newDeal.assets && newDeal.assets[0]}
              component={
                <div className="w-full">
                  <header className="flex flex-col items-start mb-4">
                    <h2 className="text-xl">Asset informations</h2>
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
          )}
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
          {/* <Step
            selected={true}
            component={<DealEstimatedCosts deal={newDeal} />}
          /> */}
          <Step
            selected={newDeal.agree_setup && newDeal.agree_costs}
            component={
              <div>
                <h1>E-sign & submit</h1>
                <div>
                  <Checkbox
                    selected={newDeal.agree_setup}
                    onChange={() =>
                      setNewDeal((prev: any) => ({
                        ...prev,
                        agree_setup: true
                      }))
                    }
                    label={`I agree to the Deal Setup Form and I certify that the provided deal information above is accurate`}
                  />
                </div>
                <div>
                  <Checkbox
                    selected={newDeal.agree_costs}
                    onChange={() =>
                      setNewDeal((prev: any) => ({
                        ...prev,
                        agree_costs: true
                      }))
                    }
                    label={`I understand there may be costs associated if I change the deal information above`}
                  />
                </div>
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
              disabled={
                !newDeal.agree_msa &&
                !newDeal.agree_setup &&
                !newDeal.agree_costs
              }
              loading={loading}
              label="Submit my deal"
              onClick={async () => {
                setNewDeal({ ...newDeal, status: 'submitted' });
                await saveDeal();
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
