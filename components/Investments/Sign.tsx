'use client';
import Checkbox from '@/components/Checkbox';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile } from '@/lib/utils';
import { Deal } from '@/types';
import * as Sentry from '@sentry/nextjs';
import { useAuthContext } from 'app/(private)/context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../Button';

export default function InvestmentSignature({
  currentUser,
  deal,
  identity,
  amount,
  onUpdate
}: {
  currentUser: any;
  deal: Deal;
  identity: any;
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

    const { identities } = currentUser;
    const { accreditations } = identity;

    if (!identities && !accreditations) return;

    const currentIdentity = identities[0];
    const currentAccreditation = accreditations ? accreditations[0] : null;

    if (!currentIdentity && !currentAccreditation) return;

    let signerName = identity.legal_name;

    if (identity.type === 'Entity') {
      // Prevent missing identity, Find a single signer for now
      const { data: signer } = await supabase
        .from('identities')
        .select('*')
        .eq('parent_identity_id', identity.id)
        .single();
      if (!signer) {
        return {
          type: 'identity-missing',
          message: `Sorry, could not find a signer for this identity. Please contact support`
        };
      }
      signerName = signer.legal_name;
    }

    const { type, legal_name, country, region, user_email } = identity;

    if (!type || !legal_name || !country || !region || !user_email) {
      return {
        type: 'identity-incomplete',
        message: 'Your identity is incomplete. Please contact support.'
      };
    }

    const body = {
      investorType: identity.type,
      legalName: identity.legal_name,
      investmentAmount: amount.toString(),
      investorIsUsBased: identity.country === 'US',
      investorState:
        identity.country === 'US' ? identity.region : identity.country,
      investorCountry: identity.country,
      investorAccreditationStatus: currentAccreditation?.value,
      investorEmail: identity.user_email,
      investorTitle: identity?.title ?? '',
      investorFullName: signerName
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
        Sentry.addBreadcrumb({
          category: 'Error',
          message:
            'Failed to fetch subscription agreement document, bad response',
          level: 'error',
          data: response
        });

        return {
          type: 'failed-fetch-subscription-agreement',
          message: 'Failed to fetch subscription agreement document'
        };
      }
      notify('Investment successful !', true);
      return await response.blob();
    } catch (error) {
      Sentry.captureException(error, {
        extra: {
          investmentId: investmentId,
          identity: identity.id
        }
      });
      return {
        type: 'failed-fetch-subscription-agreement',
        message: 'Failed to fetch subscription agreement document'
      };
    } finally {
      setLoading(false);
    }
  };

  const saveInvestment = async () => {
    if (!deal) return;
    // Removed for now, display only
    if (amount < 1) return alert(`Minimum investment amount is $${1}.`);
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
        const response: any = await getSubscriptionAgreementDocument(data.id);
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
      <h2 className="mb-6 text-lg font-medium">Review document and terms</h2>
      <main>
        <div className="flex items-center justify-between gap-4 px-4 py-3 mb-8 border rounded-lg">
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="font-bold">Deal agreement</p>
              <label className="text-sm">
                Finalized documents will be emailed when the deal has closed
              </label>
            </div>
            <Button
              label="Download"
              loading={loading}
              icon={
                <Image
                  src={'/download.svg'}
                  alt="download"
                  className="opacity-50 invert "
                  width={24}
                  height={24}
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
