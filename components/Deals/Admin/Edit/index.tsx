'use client';
import { useAuthContext } from '@/app/context';
import NewAsset from '@/components/Assets/New';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import DealBanking from '@/components/Deals/Admin/Edit/Banking';
import DealCompliance from '@/components/Deals/Admin/Edit/Compliance';
import DealEstimatedCosts from '@/components/Deals/Admin/Edit/EstimatedCost';
import DealInformations from '@/components/Deals/Admin/Edit/Informations';
import DealLegalDocuments from '@/components/Deals/Admin/Edit/LegalDocuments';
import SelectProductType from '@/components/Deals/Admin/Edit/ProductType';
import KYC from '@/components/Identity/KYC';
import LoadingForm from '@/components/Loading/Form';
import SelectMasterSeries from '@/components/MasterSeries/SelectMasterSeries';
import SelectOrganization from '@/components/Organizations/SelectOrganization';
import Step from '@/components/Step';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Asset, Deal } from '@/types';
import {
  deal_advisors_type,
  deal_banking_providers,
  deal_master_series,
  deal_offering_types,
  deal_product_types,
  deals_status
} from '@/types/values';
import { Alert } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';

export default function DealAdminEdit({ deal }: { deal: Deal }) {
  const { user, supabase } = useSupabase();
  const [newDeal, setNewDeal] = useState<any>({
    offering_type: deal_offering_types[0]
  });
  const [newDealDetails, setNewDealDetails] = useState<any>({
    agree_msa: true,
    sub_type: deal_product_types[1],
    master_series: deal_master_series[0],
    advisor_type: deal_advisors_type[0],
    banking_provider: deal_banking_providers[0]
  });
  const [hasIdentity, setHasIdentity] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

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

  const fetchDealDetails = async () => {
    if (!deal) return;
    try {
      setLoading(true);

      const { data: dealDetails, error } = await supabase
        .from('deal_details')
        .select('*')
        .eq('deal_id', deal.id)
        .single();

      if (dealDetails) {
        setNewDealDetails(dealDetails);
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

  const saveDeal = async (submitted = false) => {
    if (!deal) return;
    try {
      setLoading(true);

      // TODO: to clean, deal_details are up here
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

      if (submitted) {
        dealData.status = 'submitted';
      }

      const { data: _deal, error: _dealError } = await supabase
        .from('deals')
        .upsert({ id: deal.id, ...formatDeal(dealData) });

      if (_dealError) {
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

  const saveDealDetails = async () => {
    try {
      setLoading(true);

      const { data: _dealDetails, error: _dealDetailsError } = await supabase
        .from('deal_details')
        .upsert({ id: newDealDetails.id, ...newDealDetails });

      if (_dealDetailsError) {
        notify(`Sorry, could not save deal.`, false);
        return;
      }
      notify('Details saved.', true);
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

  const init = async () => {
    try {
      setPageLoading(true);
      const promises = [fetchDealAssets(), fetchDealDetails()];
      await Promise.all(promises);
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    // TODO: remove users_personal_identities
    if (user && user.users_personal_identities) {
      setHasIdentity(user.users_personal_identities.length > 0);
    }
  }, [user]);

  useEffect(() => {
    setNewDeal(formatDeal(deal, false));
    if (deal.status === deals_status[0]) {
      setIsDisabled(false);
    }
    if (deal.status === deals_status[1]) {
      setIsDisabled(false);
    }
    init();
  }, [deal]);

  // useEffect(() => {
  //   console.log(newDeal);
  // }, [newDeal]);

  return (
    <>
      {pageLoading && <LoadingForm />}
      {!pageLoading && (
        <Card className="container grid">
          {!hasIdentity && (
            <Card className="flex items-start card" variant="outlined">
              <KYC onUpdate={() => setHasIdentity(true)} />
            </Card>
          )}
          {hasIdentity && deal && newDeal && newDealDetails && (
            <div className={`relative flex flex-col w-full`}>
              <Step
                selected={newDeal.organization_id && newDealDetails.agree_msa}
                component={
                  <div className="w-full">
                    <div className="w-full mb-4">
                      <SelectOrganization
                        selected={newDeal.organization_id}
                        loading={loading}
                        onChange={(org: any) => {
                          setNewDeal((prev: any) => ({
                            ...prev,
                            organization_id: org?.id
                          }));
                        }}
                      />
                    </div>
                    <Checkbox
                      selected={newDealDetails.agree_msa}
                      onChange={() =>
                        setNewDealDetails((prev: any) => ({
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
                  selected={newDealDetails.sub_type}
                  component={
                    <SelectProductType
                      deal={newDealDetails}
                      selected={newDealDetails.sub_type}
                      onChange={(sub_type: string) => {
                        setNewDealDetails((prev: any) => ({
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
                    deal={newDeal}
                    onChange={(_deal: any) => {
                      setNewDeal((prev: any) => ({ ...prev, ..._deal }));
                    }}
                  />
                }
              />
              {newDeal && newDeal.assets && (
                <Step
                  selected={newDeal.assets && newDeal.assets.length > 0}
                  component={
                    <div className="w-full">
                      <header className="flex flex-col items-start mb-4">
                        <h2 className="text-xl">Asset information</h2>
                      </header>
                      <NewAsset
                        asset={newDeal.assets ? newDeal.assets[0] : null}
                        dealId={deal.id}
                        onCreate={async (asset: Asset) => {
                          await fetchDealAssets();
                        }}
                      />
                    </div>
                  }
                />
              )}
              <Step
                selected={newDealDetails?.master_series_id}
                component={
                  <SelectMasterSeries
                    deal={{ ...newDeal, ...newDealDetails }}
                    selected={newDealDetails.master_series_id}
                    onChange={(ms: any) => {
                      setNewDealDetails((prev: any) => ({
                        ...prev,
                        master_series_id: ms?.id
                      }));
                    }}
                  />
                }
              />
              <Step
                selected={newDealDetails?.legal_template_option}
                component={
                  <DealLegalDocuments
                    deal={newDealDetails}
                    onChange={(_dealDetails: any) => {
                      setNewDealDetails((prev: any) => ({
                        ...prev,
                        ..._dealDetails
                      }));
                    }}
                  />
                }
              />
              <Step
                selected={newDeal.offering_type && newDealDetails?.advisor_type}
                component={
                  <DealCompliance
                    deal={{ ...newDeal, ...newDealDetails }}
                    onChange={(_mergedDeal: any) => {
                      const { offering_type, advisor_type } = _mergedDeal;
                      setNewDeal((prev: any) => ({ ...prev, offering_type }));
                      setNewDealDetails((prev: any) => ({
                        ...prev,
                        advisor_type
                      }));
                    }}
                  />
                }
              />
              <Step
                selected={newDealDetails.banking_provider}
                component={
                  <DealBanking
                    deal={newDealDetails}
                    onChange={(_deal: any) => {
                      setNewDealDetails((prev: any) => ({ ...prev, ..._deal }));
                    }}
                  />
                }
              />
              <Step
                selected={true}
                component={
                  <DealEstimatedCosts
                    deal={{ ...newDeal, ...newDealDetails }}
                  />
                }
              />
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
              <div className="container fixed bottom-0 bg-white">
                <div
                  className={` flex items-center justify-end w-full gap-4 p-4 bg-white border shadow-lg`}
                >
                  <p className="text-sm">
                    {newDeal.status === deals_status[0] && (
                      <span>
                        To submit your deal for review, please fill in all the
                        required fields before submitting the form. Thank you.
                      </span>
                    )}
                    {newDeal.status === deals_status[1] && (
                      <span>
                        Congratulations ! Your deal has been submitted but you
                        can still update it.
                      </span>
                    )}
                    {newDeal.status === deals_status[2] && (
                      <Alert color="info">
                        Your deal is currently under review by our team.
                      </Alert>
                    )}
                    {newDeal.status === deals_status[5] && (
                      <Alert>
                        Congratulations ! Your deal has been onboarded.
                      </Alert>
                    )}
                    {newDeal.status === deals_status[6] && (
                      <Alert>Your deal is closing.</Alert>
                    )}
                    {newDeal.status === deals_status[7] && (
                      <Alert color="info">Your deal has been closed.</Alert>
                    )}
                    {newDeal.status === deals_status[8] && (
                      <div className="py-4">Your deal has been archived.</div>
                    )}
                  </p>
                  {/* <Button loading={loading} labùel="Save my deal" onClick={saveDeal} /> */}
                  <div className={`flex gap-3 ${isDisabled ? 'disabled' : ''}`}>
                    <Button
                      loading={loading}
                      label={'Save'}
                      onClick={async () => {
                        await saveDeal();
                        await saveDealDetails();
                      }}
                    />
                    <Button
                      disabled={!(newDeal.agree_setup && newDeal.agree_costs)}
                      loading={loading}
                      label={newDeal.status === 'draft' ? 'Submit' : 'Update'}
                      onClick={async () => {
                        await saveDeal(true);
                        await saveDealDetails();
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* {deal.status === deals_status[4] && (
            <Alert severity="success">
              Congratulations, your deal is onboarded. If you require any
              assistance, please contact{' '}
              <span className="underline cursor-pointer">
                support@allocations.com
              </span>
            </Alert>
          )} */}
            </div>
          )}
        </Card>
      )}
    </>
  );
}
