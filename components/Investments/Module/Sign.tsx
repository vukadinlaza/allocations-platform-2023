'use client';
import { useAuthContext } from '@/app/context';
import Checkbox from '@/components/Checkbox';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal, Entity } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../../Button';

export default function InvestmentSignature({
  currentUser,
  deal,
  entity,
  amount,
  onUpdate
}: {
  currentUser: any;
  deal: Deal;
  entity: Entity;
  amount: number;
  onUpdate?: () => any;
}) {
  const { supabase, user } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [signed, setSigned] = useState<boolean>(false);
  const router = useRouter();
  const { notify } = useAuthContext();

  const getSubscriptionAgreementDocument = async (
    investmentId: string,
    preview = false
  ) => {
    if (!currentUser && !entity && !investmentId) return;

    const { users_personal_identities } = currentUser;
    const { accreditations } = entity;

    if (!users_personal_identities && !accreditations) return;

    const currentIdentity = users_personal_identities[0];
    const currentAccreditation = accreditations ? accreditations[0] : null;

    if (!currentIdentity && !currentAccreditation) return;

    //tpl_GrQEGyCarkFX7dcjCn
    const body = {
      investorType:
        entity.type === 'Myself/Individual' ? 'Individual' : 'Entity',
      legalName: entity.name,
      investmentAmount: amount.toString(),
      investorIsUsBased: true, // TODO: always true?
      investorState: currentIdentity.region,
      investorCountry: currentIdentity.country,
      investorAccreditationStatus: currentAccreditation.value,
      investorEmail: currentUser.email,
      investorTitle: 'Director', // TODO: update
      investorFullName: currentUser.first_name + ' ' + currentUser.last_name
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
        // router.push('/investments');

        notify('Successfully created !', true);
        throw new Error('Failed to fetch subscription agreement document');
      }

      const document = await response.blob();
      return document;
    } catch (error) {
      notify(`Sorry, could not create new asset.`, false);
      return;
    } finally {
      setLoading(false);
    }
  };

  const saveInvestment = async () => {
    if (!deal || !deal.minimum_investment) return;
    if (!signed) return alert('You have to sign to complete your investment.');
    if (amount < deal.minimum_investment)
      return alert(`Minimum investment amount is $${deal.minimum_investment}.`);
    try {
      setLoading(true);
      const { data } = await supabase
        .from('investments')
        .insert({
          deal_id: deal.id,
          subscription_amount: amount
        })
        .select()
        .single();

      if (data) {
        await getSubscriptionAgreementDocument(data.id);
        router.push(`/investments/${data.id}`);
      }
    } catch (error) {
      console.log(error);
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
            <button className="btn info">
              <Image
                src={'/download.svg'}
                alt="download"
                className="mr-2 opacity-50 "
                width={18}
                height={18}
              />
              <span>Download</span>
            </button>
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
