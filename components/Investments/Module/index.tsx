import KYC from '@/components/Identity/KYC';
import LoadingModule from '@/components/Loading/Module';
import None from '@/components/None';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';
import InvestmentsAccreditation from './Accreditation';
import InvestmentIdentity from './Entity';
import InvestmentsSign from './Sign';

export default function InvestmentsModule({
  amount,
  deal
}: {
  amount: number;
  deal: Deal;
}) {
  const { supabase, fetchUser } = useSupabase();
  const [identity, setIdentity] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkPermissions = async () => {
    try {
      setLoading(true);
      setCurrentUser(null);
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && session.user) {
        const user = await fetchUser(session.user.email);
        setCurrentUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <div className="investments-module">
      {loading && (
        <div className="p-6">
          <LoadingModule />
        </div>
      )}
      {!loading && !currentUser && (
        <None text="Sorry no user data found. Please report in Missing Data." />
      )}
      {!loading && currentUser && (
        <div>
          <div className="p-6">
            <InvestmentIdentity
              identities={currentUser.identities}
              onChange={(v) => {
                setIdentity(v);
              }}
              onUpdate={checkPermissions}
              selected={identity?.id}
              validate={true}
            />
          </div>
          {/* {identity &&
            (!identity.type ||
              !identity.region ||
              !identity.country ||
              !identity.user_email) && (
              <div className="p-6 border-t">
                <KYC onUpdate={checkPermissions} uncomplete={true} />
              </div>
            )} */}
          {identity && (
            <div>
              {currentUser.identities.length < 1 && (
                <div className="p-6 border-t">
                  <KYC onUpdate={checkPermissions} />
                </div>
              )}
              {currentUser.identities.length > 0 &&
                (identity.accreditations?.length ?? 0) < 1 && (
                  <div className="p-6 border-t">
                    <InvestmentsAccreditation
                      identity={identity}
                      onUpdate={(accreditation: any) => {
                        setIdentity((prev: any) => ({
                          ...prev,
                          accreditations: [accreditation]
                        }));
                        checkPermissions();
                      }}
                    />
                  </div>
                )}
              {currentUser.identities.length > 0 &&
                (identity.accreditations?.length ?? 0) > 0 && (
                  <div className="p-6 border-t">
                    <InvestmentsSign
                      currentUser={currentUser}
                      deal={deal}
                      identity={identity}
                      amount={amount}
                    />
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
