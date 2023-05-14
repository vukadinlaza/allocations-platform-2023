import Checkbox from '@/components/Checkbox';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal, Entity } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../../Button';

export default function InvestmentSignature({
  deal,
  entity,
  amount,
  onUpdate
}: {
  deal: Deal;
  entity: Entity;
  amount: number;
  onUpdate?: () => any;
}) {
  const { supabase, user } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [signed, setSigned] = useState<boolean>(false);
  const router = useRouter();

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
        .select();

      if (data) {
        console.log(data);
        router.push('/investments');
      }

      // if (data) {
      //   onUpdate();
      // }
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
            <p className="font-bold">Draft closing documents</p>
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
