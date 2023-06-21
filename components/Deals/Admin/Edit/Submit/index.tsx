'use client';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Step from '@/components/Step';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useAuthContext } from 'app/(private)/context';
import { useEffect, useState } from 'react';
import EstimatedCosts from './EstimatedCost';

export function getAlertByStatus(status: string) {
  if (!status) return;
  switch (status) {
    case 'draft':
      return {
        content:
          'To submit your deal for review, please fill in all the required fields before submitting the form. Thank you.',
        color: 'bg-sky-100 text-sky-600'
      };
    case 'submitted':
      return {
        content:
          'Congratulations! Your deal has been submitted but you can still update it.',
        color: 'bg-primary-100 text-primary-600'
      };
    case 'pending':
      return {
        content: 'Your deal is currently under review by our team.',
        color: 'bg-amber-100 text-amber-600'
      };
    case 'onboarding':
      return {
        content: 'Congratulations! Your deal has been onboarded.',
        color: 'bg-primary-100 text-primary-600'
      };
    case 'closing':
      return {
        content: 'Your deal is closing.',
        color: 'bg-sky-100 text-sky-600'
      };
    case 'closed':
      return {
        content: 'Your deal has been closed.',
        color: 'bg-slate-100 text-slate-600'
      };
    case 'archived':
      return {
        content: 'Your deal has been archived.',
        color: 'bg-slate-100 text-slate-600'
      };
    default:
      return {
        content: '',
        color: ''
      };
  }
}

export default function DealSetup({ deal }: { deal: Deal }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [newDeal, setNewDeal] = useState<any>({});
  const { notify } = useAuthContext();

  const { saveDeal, saveDealDetails } = useSupabase();

  const save = async () => {
    try {
      setLoading(true);
      const { agree_setup, agree_costs } = newDeal;
      const promises = [
        saveDealDetails({ id: deal.deal_details_id, agree_setup, agree_costs })
      ];
      const [dealResponse] = await Promise.all(promises);
      const { error } = dealResponse;
      if (error) {
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

  const submit = async () => {
    try {
      setLoading(true);
      const promises = [
        saveDeal({
          id: deal.id,
          status: 'submitted'
        })
      ];
      const [dealResponse] = await Promise.all(promises);
      const { error } = dealResponse;
      if (error) {
        notify(`Sorry, could not submit your deal.`, false);
        return;
      }
      notify('Congratulations ! Your deal has been submitted.', true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { agree_setup, agree_costs } = deal;
    setNewDeal({ agree_setup, agree_costs });
  }, [deal]);

  return (
    <div className="grid gap-4">
      <div className="overflow-hidden bg-white rounded-lg">
        <Step selected={true} component={<EstimatedCosts deal={deal} />} />
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
      </div>
      <div className="mb-3">
        {deal.status && (
          <Alert
            content={getAlertByStatus(deal.status)?.content}
            color={getAlertByStatus(deal.status)?.color}
          />
        )}
      </div>
      <div className="flex gap-4">
        <Button
          loading={loading}
          label={deal.status === 'draft' ? 'Save as a draft' : 'Save'}
          onClick={save}
        />
        {deal.status === 'draft' && (
          <Button
            disabled={!newDeal.agree_costs || !newDeal.agree_setup}
            loading={loading}
            label={'Submit your deal'}
            onClick={submit}
          />
        )}
      </div>
    </div>
  );
}
