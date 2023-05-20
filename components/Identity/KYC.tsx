import Button from '@/components/Button';
import PlaidIdentityLink from '@/components/Plaid/IdentityLink';
import { getIdentityLinkToken } from '@/lib/plaid';
import { useState } from 'react';

export default function KYC({ onUpdate }: { onUpdate: () => void }) {
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
        <p className="text-sm">
          Required by United Stated banking laws. This information is{' '}
          <span className="text-primary-500">kept secure</span>.
        </p>
      </div>
      <Button
        label={'Verify my identity'}
        loading={loading}
        onClick={openIdentity}
      />
      {token && (
        <PlaidIdentityLink linkToken={token} onSuccess={() => onUpdate()} />
      )}
    </div>
  );
}
