import LoadingModule from '@/components/Loading/Module';
import None from '@/components/None';
import ProfilesList from '@/components/Profiles/List';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import { useEffect, useState } from 'react';
import Accreditation from '../Accreditation';
import Sign from '../Sign';

export default function InvestmentsModule({
  amount,
  deal
}: {
  amount: number;
  deal: Deal;
}) {
  const { supabase, fetchUser } = useSupabase();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [identityId, setIdentityId] = useState<any>(null);
  const [hasAccreditations, setHasAccreditations] = useState<boolean>(false);
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

  useEffect(() => {
    if (identityId) {
      const { identities } = currentUser;
      const found = identities.find((i: any) => i.id === identityId);
      if (found) {
        const { accreditations } = found || [];
        setHasAccreditations(accreditations.length > 0);
      }
    }
  }, [identityId]);

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
        <div className="p-3 md:p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium">Select a profile</h2>
            <main>
              <div className="mb-4">
                <ProfilesList
                  details={false}
                  selectedId={identityId}
                  onSelect={(id: string) => {
                    setIdentityId(id);
                  }}
                />
              </div>
            </main>
          </div>
          {identityId && !hasAccreditations && (
            <div className="mb-8">
              <Accreditation
                identityId={identityId}
                onUpdate={(accreditation: any) => {
                  checkPermissions();
                  setHasAccreditations(true);
                }}
              />
            </div>
          )}
          {identityId && hasAccreditations && (
            <div className="pt-4 border-t">
              <Sign
                currentUser={currentUser}
                deal={deal}
                identity={currentUser.identities.find(
                  (i: any) => i.id === identityId
                )}
                amount={amount}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
