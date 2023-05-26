'use client';
import { useAuthContext } from '@/app/context';
import Checkbox from '@/components/Checkbox';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Deal, Entity, Identity } from '@/types';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../../Button';

export default function InvestmentSignature({
  currentUser,
  deal,
  identity,
  amount,
  onUpdate
}: {
  currentUser: any;
  deal: Deal;
  identity: Identity;
  amount: number;
  onUpdate?: () => any;
}) {
  const { supabase, user } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [signed, setSigned] = useState<boolean>(false);
  const router = useRouter();
  const { notify } = useAuthContext();

  const downloadDocumentPreview = async () => {
    try {
      setLoading(true);
      const response = await AllocationsAPI.getSPVAgreementPreview(
        deal.id as string
      );
      if (response.ok) {
        await downloadFile(await response.blob(), 'spv-agreement-preview.pdf');
      } else {
        console.error('Failed to download the document');
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
      notify(`Sorry, could not download document preview.`, false);
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptionAgreementDocument = async (
    investmentId: string,
    preview = false
  ) => {
    if (!currentUser && !identity && !investmentId) return;

    const { users_personal_identities } = currentUser;
    const { accreditations } = identity;

    if (!users_personal_identities && !accreditations) return;

    const currentIdentity = users_personal_identities[0];
    const currentAccreditation = accreditations ? accreditations[0] : null;

    if (!currentIdentity && !currentAccreditation) return;

    const body = {
      investorType: identity.type,
      legalName: identity.legal_name,
      investmentAmount: amount.toString(),
      investorIsUsBased: identity.country === 'US',
      investorState: identity.region,
      investorCountry: identity.country,
      investorAccreditationStatus: currentAccreditation?.value,
      investorEmail: identity.user_email,
      investorTitle: identity?.title ?? '',
      investorFullName: identity.type === 'Individual' ? identity.legal_name : currentUser.first_name + ' ' + currentUser.last_name
    };

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.allocations.com/documents/subscription-agreement/${investmentId}?preview=${preview}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_ALLOCATIONS_KEY}`
          },
          body: JSON.stringify(body)
        }
      );

      if (!response.ok) {
        notify('Failed to fetch subscription agreement document', false);
        Sentry.addBreadcrumb({
          category: 'Error',
          message:
            'Failed to fetch subscription agreement document, bad response',
          level: 'error',
          data: response
        });
        throw new Error('Failed to fetch subscription agreement document');
      }
      notify('Investment successful !', true);
      return await response.blob();
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          investmentId: investmentId,
          identity: identity.id,
        }
      });
      notify('Failed to fetch subscription agreement document', false);
      return;
    } finally {
      setLoading(false);
    }
  };

  const saveInvestment = async () => {
    if (!deal) return;
    if (!signed) return alert('You have to sign to complete your investment.');
    // Removed for now, display only
    if (amount < (deal.minimum_investment || 1))
      return alert(
        `Minimum investment amount is $${1 || deal.minimum_investment}.`
      );
    try {
      setLoading(true);

      const { data } = await supabase
        .from('investments')
        .insert({
          deal_id: deal.id,
          subscription_amount: amount,
          identities_id: identity.id,
          user_email: currentUser.email
        })
        .select()
        .single();

      if (data) {
        await getSubscriptionAgreementDocument(data.id);
        router.push(`/investments/${data.id}`);
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(error);
      notify(`Sorry, could not create new investment.`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-lg font-bold">Review document and terms</h2>
      </header>
      <main>
        <div className="flex items-center justify-between gap-4 px-4 py-3 mb-8 border rounded-lg">
          <div>
            <p className="font-bold">Deal agreement</p>
            <p className="mb-6 text-sm">
              Finalized documents will be emailed when the deal has closed
            </p>
            <Button
              label="Download"
              loading={loading}
              icon={
                <Image
                  src={'/download.svg'}
                  alt="download"
                  className="mr-2 opacity-50 invert "
                  width={18}
                  height={18}
                />
              }
              onClick={downloadDocumentPreview}
            />
          </div>
        </div>
        <div className="mb-6">
          <Checkbox
            label="I have read the terms and provisions and agree to e-sign the above documents."
            selected={signed}
            onChange={() => setSigned(!signed)}
          />
        </div>
        <div className="grid">
          <Button
            label="Commit & E-sign"
            loading={loading}
            disabled={!signed}
            onClick={saveInvestment}
          />
        </div>
      </main>
    </div>
  );
}
