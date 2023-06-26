'use client';
import { useAuthContext } from '@/app/(private)/context';
import { isIdentityValid } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Alert from '../Alert';

export const checkIdentities = (identities: []) => {
  if (!identities) {
    return 'create';
  }
  const areIdentitiesValid: any[] = identities.map(
    (identity: any) => isIdentityValid(identity)?.success
  );
  if (areIdentitiesValid.length > 0) {
    const hasFalse = areIdentitiesValid.some(
      (value: boolean) => value === false
    );
    if (hasFalse) {
      return 'missing_data';
    }
  }
  return '';
};
export default function Check() {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    setStatus(checkIdentities(user.identities));
  }, [user]);

  return (
    <div onClick={() => router.push('/profile')}>
      {status === 'missing_data' && (
        <Alert
          color="text-amber-600 bg-amber-100 cursor-pointer hover:bg-amber-100 transition"
          close={true}
          content={
            <div className="flex items-center justify-center gap-2 py-3 text-sm text-center">
              <span className="mb-0 font-bold whitespace-nowrap">
                One or more of your identities are incomplete
              </span>
              <span className="hidden gap-2 md:flex whitespace-nowrap">
                <span>
                  — Please complete your identity information before proceeding
                  with any investments.
                </span>
                <span className="underline">Click here to check</span>
              </span>
            </div>
          }
        />
      )}
      {/* <Alert
        color="text-red-600 bg-red-100 cursor-pointer hover:bg-red-100 transition"
        close={false}
        content={
          <div className="flex items-center justify-center gap-2 py-3 text-sm text-center">
            <span className="mb-0 font-bold whitespace-nowrap">
              Identity has failed
            </span>
            <span className="hidden gap-2 md:flex whitespace-nowrap">
              <span>
                — Please complete your identity information before proceeding
                with any investments.
              </span>
              <span className="underline">Click here to check</span>
            </span>
          </div>
        }
      /> */}
    </div>
  );
}
