import Button from '@/components/Button';
import PlaidIdentityLink from '@/components/Plaid/IdentityLink';
import { getIdentityLinkToken } from '@/lib/plaid';
import { Alert } from '@mui/material';
import { useState } from 'react';

export default function KYC({
  onUpdate,
  uncomplete = false
}: {
  onUpdate: () => void;
  uncomplete?: boolean;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const openIdentity = async () => {
    try {
      setLoading(true);
      const response = await getIdentityLinkToken();

      if (response && response.link_token) {
        setToken(response.link_token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="kyc">
      <div className="flex flex-col mb-8">
        <h2 className="text-lg font-bold">Personal information</h2>
        <p className="mb-4 text-sm">
          Required by United Stated banking laws. This information is{' '}
          <span className="text-primary-500">kept secure</span>.
        </p>
        {uncomplete && (
          <Alert severity="warning">
            Unfortunately this identity is incomplete. Please provide us with
            more information.
          </Alert>
        )}
      </div>
      <Button
        label={uncomplete ? 'Update my identity' : 'Verify my identity'}
        loading={loading}
        onClick={openIdentity}
      />
      {token && (
        <PlaidIdentityLink linkToken={token} onSuccess={() => onUpdate()} />
      )}
    </div>
  );
}
