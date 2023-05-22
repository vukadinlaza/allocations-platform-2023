import KYC from '@/components/Identity/KYC';
import LoadingModule from '@/components/Loading/Module';
import None from '@/components/None';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';
import InvestmentsAccreditation from './Accreditation';
import InvestmentsEntity from './Entity';
import InvestmentsSign from './Sign';

export default function InvestmentsModule({
  amount,
  deal
}: {
  amount: number;
  deal: Deal;
}) {
  const { supabase, fetchUser } = useSupabase();
  const [entity, setEntity] = useState<any>(null);
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
        <None text="Sorry no user data found. Please refresh." />
      )}
      {!loading && currentUser && (
        <div>
          <div className="p-6 border-t">
            <InvestmentsEntity
              entities={currentUser.users_investment_entities}
              onChange={(v) => {
                setEntity(v);
              }}
              onUpdate={checkPermissions}
              selected={entity?.id}
            />
          </div>
          {entity && (
            <div>
              {currentUser.users_personal_identities.length < 1 && (
                <div className="p-6 border-t">
                  <KYC onUpdate={checkPermissions} />
                </div>
              )}
              {currentUser.users_personal_identities.length > 0 &&
                entity.accreditations.length < 1 && (
                  <div className="p-6 border-t">
                    <InvestmentsAccreditation
                      entity={entity}
                      onUpdate={(accreditation: any) => {
                        setEntity((prev: any) => ({
                          ...prev,
                          accreditations: [accreditation]
                        }));
                        checkPermissions();
                      }}
                    />
                  </div>
                )}
              {currentUser.users_personal_identities.length > 0 &&
                entity.accreditations.length > 0 && (
                  <div className="p-6 border-t">
                    <InvestmentsSign
                      currentUser={currentUser}
                      deal={deal}
                      entity={entity}
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
