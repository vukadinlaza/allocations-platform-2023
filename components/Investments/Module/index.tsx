import LoadingModule from '@/components/Loading/Module';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import InvestmentsAccreditation from './Accreditation';
import InvestmentsIdentity from './Identity';
import InvestmentsKYC from './KYC';
import InvestmentsSign from './Sign';

export default function InvestmentsModule({ amount }: { amount: number }) {
  const { supabase, fetchUser } = useSupabase();
  const [identity, setIdentity] = useState<any>(null);
  const [hasAccreditation, setHasAccreditation] = useState<boolean>(false);
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
        console.log(user);
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
              onChange={(v) => setIdentity(v)}
              selected={identity?.id}
            />
          </div>
          {identity && (
            <div>
              {!currentUser.users_personal_identities && (
                <div className="p-6 border-t">
                  <InvestmentsKYC />
                </div>
              )}
              <div className="p-6 border-t">
                <InvestmentsAccreditation />
              </div>
              <div className="p-6 border-t">
                <InvestmentsSign />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
