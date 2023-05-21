'use client';
import AlertsMigration from '@/components/Alerts/Migration';
import Header from '@/components/Header';
import LoadingApp from '@/components/Loading/App';
import Login from '@/components/Login';
import { useSupabase } from '@/lib/supabase-provider';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: any }) => {
  // data
  const { supabase, fetchUser } = useSupabase();
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [betaAlert, showBetaAlert] = useState(true);
  const [expand, setExpand] = useState(false);

  const signOut = async () => {
    try {
      const response = await supabase.auth.signOut();
      if (response) {
        setUser(null);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAuthStateChange = async () => {
    try {
      setLoading(true);
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && session.user) {
        const users_infos = await fetchUser(session.user.email);

        setUser({
          ...session.user,
          ...users_infos,
          is_super_admin: users_infos?.is_super_admin,
          currentOrganization: null
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg: string, success: boolean = false) => {
    if (success) {
      return toast.success(msg);
    }
    return toast.error(msg);
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      notify,
      setCurrentOrganization: (orgId: string) =>
        setUser((prev: any) => ({ ...prev, currentOrganization: orgId })),
      signOut
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoadingApp />}
      {!loading && !user && <Login />}
      {!loading && user && (
        <main className="relative">
          <Header setExpand={setExpand} expand={expand} />
          <div
            className={`p-4 ${
              expand ? 'container transition-all duration-500 ease-out' : ''
            }`}
          >
            {betaAlert && (
              <div>
                {/* <AlertsBeta showBetaAlert={showBetaAlert} /> */}
                <AlertsMigration
                  showBetaAlert={showBetaAlert}
                ></AlertsMigration>
              </div>
            )}
            {children}
          </div>
          <ToastContainer />
        </main>
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, notify, setCurrentOrganization, signOut }: any =
    useContext(AuthContext);
  return {
    user,
    notify,
    setCurrentOrganization,
    signOut
  };
};
