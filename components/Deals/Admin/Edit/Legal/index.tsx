'use client';
import NewAsset from '@/components/Assets/New';
import Button from '@/components/Button';
import Banking from '@/components/Deals/Admin/Edit/Legal/Banking';
import Compliance from '@/components/Deals/Admin/Edit/Legal/Compliance';
import Documents from '@/components/Deals/Admin/Edit/Legal/Documents';
import SelectMasterSeries from '@/components/MasterSeries/SelectMasterSeries';
import Step from '@/components/Step';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useAuthContext } from 'app/(private)/context';
import { useEffect, useState } from 'react';

export default function DealLegal({ deal }: { deal: Deal }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [newDeal, setNewDeal] = useState<any>({});
  const { notify } = useAuthContext();

  const { saveDeal, saveDealDetails, supabase } = useSupabase();

  const fetchDealAssets = async () => {
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

  const save = async () => {
    try {
      setLoading(true);
      const {
        advisor_type,
        advisor_type_note,
        banking_provider,
        banking_provider_note,
        investor_type,
        legal_template_option,
        offering_type,
        master_series_id
      } = newDeal;

      const promises = [
        saveDeal({
          id: deal.id,
          offering_type
        }),
        saveDealDetails({
          id: deal.deal_details_id,
          advisor_type,
          advisor_type_note,
          banking_provider,
          banking_provider_note,
          investor_type,
          legal_template_option,
          master_series_id
        })
      ];
      const [dealResponse, dealDetailsResponse] = await Promise.all(promises);
      const { error } = dealResponse;
      const { errorDetails } = dealDetailsResponse;
      if (error && errorDetails) {
        notify(`Sorry, could not save deal.`, false);
        return;
      }
      notify('Deal saved.', true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNewDeal(deal);
    fetchDealAssets();
    console.log(deal);
  }, [deal]);

  return (
    <div className="grid gap-4">
      <div className="grid overflow-hidden bg-white border rounded-lg">
        {newDeal.assets && (
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
                  onCreate={async (asset: any) => {
                    await fetchDealAssets();
                  }}
                />
              </div>
            }
          />
        )}
        <Step
          selected={newDeal?.master_series_id}
          component={
            <SelectMasterSeries
              deal={newDeal}
              selected={newDeal.master_series_id}
              onChange={(master_series_id: any) => {
                setNewDeal((prev: any) => ({
                  ...prev,
                  master_series_id
                }));
              }}
            />
          }
        />
        <Step
          selected={newDeal?.legal_template_option}
          component={
            <Documents
              deal={newDeal}
              onChange={(legal_template_option: any) => {
                setNewDeal((prev: any) => ({
                  ...prev,
                  legal_template_option
                }));
              }}
            />
          }
        />
        <Step
          selected={newDeal.offering_type && newDeal?.advisor_type}
          component={
            <div className="w-full">
              <Compliance
                deal={{ ...newDeal, ...newDeal }}
                onChange={(_mergedDeal: any) => {
                  const { offering_type, advisor_type, investor_type } =
                    _mergedDeal;
                  setNewDeal((prev: any) => ({ ...prev, offering_type }));
                  setNewDeal((prev: any) => ({
                    ...prev,
                    advisor_type,
                    investor_type
                  }));
                }}
              />
              {newDeal.advisor_type === 'Other' && (
                <input
                  type="text"
                  placeholder={'Name of your advisor...'}
                  value={newDeal.advisor_type_note}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewDeal((prev: any) => ({
                      ...prev,
                      advisor_type_note: e.target.value
                    }))
                  }
                />
              )}
            </div>
          }
        />
        <Step
          selected={newDeal.banking_provider}
          component={
            <div className="grid w-full gap-2 mb-4">
              <Banking
                deal={newDeal}
                onChange={(banking_provider: any) => {
                  setNewDeal((prev: any) => ({
                    ...prev,
                    banking_provider
                  }));
                }}
              />
              {newDeal.banking_provider === 'Custom' && (
                <input
                  type="text"
                  placeholder={'Name of your banking provider...'}
                  value={newDeal.banking_provider_note}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewDeal((prev: any) => ({
                      ...prev,
                      banking_provider_note: e.target.value
                    }))
                  }
                />
              )}
            </div>
          }
        />
      </div>
      <div>
        <Button loading={loading} label={'Save'} onClick={save} />
      </div>
    </div>
  );
}
