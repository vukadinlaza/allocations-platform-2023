import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal, Field } from '@/types';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import FormBuilder from '../FormBuilder';
import { isValidEmail } from '../Login';

export default function DealInvite({
  deal,
  onClose
}: {
  deal?: Deal;
  onClose: () => void;
}) {
  const { user, notify } = useAuthContext();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<any>({
    recipient_email: undefined,
    deal_id: undefined,
    amount: 0,
    user_email: undefined
  });

  const model: Field[] = [
    {
      label: 'Enter an amount (optional):',
      key: 'amount',
      type: 'money',
      show: true
    }
  ];

  const sendInvitation = async () => {
    if (!isValidEmail(invitation.recipient_email)) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invitations')
        .insert(invitation);

      if (error) {
        notify(`Sorry, could not send invitation.`, false);
        return;
      }
      notify('Successfully send !', true);
    onClose();
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not send invitation.`, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deal) {
      setInvitation((prev: any) => ({
        ...prev,
        deal_id: deal.id,
        user_email: user.email
      }));
    }
  }, []);

  return (
    <div>
      <div>
        <Alert severity="info" className="mb-2">
          <b>Amount is optional</b> and can always be modified by the investor.
          Your recipient will receive an email to invest in your deal.
        </Alert>
        <div>
          <label>*Enter email address:</label>
          <input
            value={invitation.recipient_email}
            type="text"
            id="outlined-basic"
            placeholder="mail@address.com"
            className="w-full mb-2"
            onChange={(e) => {
              setInvitation((prev: any) => ({
                ...prev,
                recipient_email: e.target.value
              }));
            }}
          />
        </div>
        <div>
          <FormBuilder
            data={{ amount: invitation.amount }}
            emit={true}
            model={model}
            onSubmit={(v: any) => {
              const { amount } = v;
              setInvitation((prev: any) => ({
                ...prev,
                amount
              }));
            }}
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <Button
          disabled={!isValidEmail(invitation.recipient_email)}
          loading={loading}
          label={'Send invitation'}
          onClick={() => sendInvitation()}
        />
      </div>
    </div>
  );
}
