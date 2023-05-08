'use client';
import AlertsBeta from '@/components/Alerts/Beta';
import Header from '@/components/Header';
import LoadingApp from '@/components/Loading/App';
import Login from '@/components/Login';
import SlideOver from '@/components/SlideOver';
import supabase, {
  fetchDeals,
  fetchEntities,
  fetchInvestments,
  fetchOrganizations,
  fetchUser
} from '@/lib/supabase';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [betaAlert, showBetaAlert] = useState(true);
  const [slideOverData, setSlideOverData] = useState({});

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

  const setSlideOver = (isOpen: boolean, data: any, type: string) => {
    if (!type && !data) return;
    setOpen(isOpen);
    setSlideOverData({ data, type });
  };

  const onAuthStateChange = async () => {
    try {
      setLoading(true);
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && session.user) {
        const users_infos = await fetchUser(session.user.email);
        const { data: organizations } = await fetchOrganizations();
        const { data: entities } = await fetchEntities();
        const { data: deals } = await fetchDeals();
        const { data: investments } = await fetchInvestments();

        setUser({
          ...session.user,
          ...users_infos,
          organizations,
          entities,
          deals,
          investments,
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
      open,
      notify,
      setCurrentOrganization: (orgId: string) =>
        setUser((prev: any) => ({ ...prev, currentOrganization: orgId })),
      setSlideOver,
      signOut
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {loading && <LoadingApp />}
      {!loading && !user && <Login />}
      {!loading && user && (
        <main>
          <Header />
          <div className="p-4">
            {betaAlert && <AlertsBeta showBetaAlert={showBetaAlert} />}
            {children}
          </div>
          <SlideOver open={open} setOpen={setOpen} data={slideOverData} />
          <ToastContainer />
        </main>
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const {
    user,
    open,
    notify,
    setSlideOver,
    setCurrentOrganization,
    signOut
  }: any = useContext(AuthContext);
  return { user, open, notify, setSlideOver, setCurrentOrganization, signOut };
};
