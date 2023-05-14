import LoadingModule from '@/components/Loading/Module';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import InvestmentsAccreditation from './Accreditation';
import InvestmentsIdentity from './Identity';
import InvestmentsKYC from './KYC';
import InvestmentsSign from './Sign';

export default function InvestmentsModule({ amount }: { amount: number }) {
  const { supabase, fetchUser } = useSupabase();
  const [entity, setEntity] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkPermissions = async () => {
    try {
      setLoading(true);
      // check user session everytime
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && session.user) {
        const user = await fetchUser(session.user.email);
        setCurrentUser(user);
      }
      //
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
      {!loading && currentUser && (
        <div>
          <div className="p-6 border-t">
            <InvestmentsIdentity
              entities={currentUser.users_investment_entities}
              onChange={(v) => setEntity(v)}
              onUpdate={checkPermissions}
              selected={entity?.id}
            />
          </div>
          {entity && (
            <div>
              {currentUser.users_personal_identities.length < 1 && (
                <div className="p-6 border-t">
                  <InvestmentsKYC />
                </div>
              )}
              {entity.accreditations.length < 1 && (
                <div className="p-6 border-t">
                  <InvestmentsAccreditation />
                </div>
              )}
              {currentUser.users_personal_identities.length > 0 &&
                entity.accreditations.length > 0 && (
                  <div className="p-6 border-t">
                    <InvestmentsSign />
                  </div>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
