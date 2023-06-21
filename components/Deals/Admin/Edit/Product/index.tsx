'use client';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import SelectProductType from '@/components/Deals/Admin/Edit/Product/ProductType';
import SelectManager from '@/components/Deals/SelectManager';
import SelectOrganization from '@/components/Organizations/SelectOrganization';
import Step from '@/components/Step';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';

export default function DealProductSetup({ deal }: { deal: Deal }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [newDeal, setNewDeal] = useState<any>({});
  const { notify } = useAuthContext();

  const { saveDeal, saveDealDetails } = useSupabase();

  const save = async () => {
    try {
      setLoading(true);
      const { agree_msa, organization_id, fund_manager_email, sub_type } =
        newDeal;
      const promises = [
        saveDeal({
          id: deal.id,
          organization_id
        }),
        saveDealDetails({
          id: deal.deal_details_id,
          agree_msa,
          fund_manager_email,
          sub_type
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
    setNewDeal(deal);
  }, [deal]);

  return (
    <div className="grid gap-4">
      <div className="grid overflow-hidden bg-white border rounded-lg">
        <Step
          selected={newDeal.organization_id && newDeal.agree_msa}
          component={
            <div className="w-full">
              <div className="w-full mb-4">
                <SelectOrganization
                  deal={newDeal}
                  loading={loading}
                  onChange={(data: any) => {
                    const { organization_id } = data;
                    if (organization_id) {
                      setNewDeal((prev: any) => ({
                        ...prev,
                        organization_id
                      }));
                    }
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
              <p onClick={downloadMSA} className="cta">
                Download Master Services Agreement
              </p>
            </div>
          }
        />
        <Step
          selected={newDeal.fund_manager_email}
          component={
            <SelectManager
              organizationId={newDeal.organization_id}
              onChange={(fund_manager_email: string) => {
                setNewDeal((prev: any) => ({
                  ...prev,
                  fund_manager_email
                }));
              }}
            />
          }
        />
        {newDeal.type === 'spv' && (
          <Step
            selected={newDeal.sub_type}
            component={
              <SelectProductType
                selected={newDeal.sub_type}
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
      </div>
      <div>
        <Button loading={loading} label={'Save'} onClick={save} />
      </div>
    </div>
  );
}
