'use client';
import Button from '@/components/Button';
import Banking from '@/components/Deals/Edit/Legal/Banking';
import Compliance from '@/components/Deals/Edit/Legal/Compliance';
import Documents from '@/components/Deals/Edit/Legal/Documents';
import Step from '@/components/Step';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useAuthContext } from 'app/(private)/context';
import { useEffect, useState } from 'react';

export default function DealLegal({ deal }: { deal: Deal }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [newDeal, setNewDeal] = useState<any>({});
  const { notify } = useAuthContext();

  const { saveDeal, saveDealDetails } = useSupabase();

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
        offering_type
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
          legal_template_option
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
  }, [deal]);

  return (
    <div className="grid gap-4">
      <div className="grid overflow-hidden bg-white border rounded-lg">
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
