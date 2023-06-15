'use client';
import Header from '@/components/Header';
import LoadingApp from '@/components/Loading/App';
import Login from '@/components/Login';
import { useSupabase } from '@/lib/supabase-provider';
import Hotjar from '@hotjar/browser';
import * as Sentry from '@sentry/nextjs';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const { supabase, fetchUser } = useSupabase();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
        Sentry.setUser({
          email: session.user.email,
          id: session.user.id,
          name: `${users_infos.first_name || ''} ${users_infos.last_name || ''}`
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

  useEffect(() => {
    if (user) {
      const siteId = 3502247;
      const hotjarVersion = 6;
      Hotjar.init(siteId, hotjarVersion);
      Hotjar.identify(user.id, {
        email: user.email
      });
    }
  }, [user]);

  const value = useMemo(() => {
    return {
      user,
      notify,
      setUser,
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
            className={`px-4 py-6 ${
              expand ? 'container transition-all duration-500 ease-out' : ''
            }`}
          >
            {children}
          </div>
          <ToastContainer />
        </main>
      )}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, notify, setUser, setCurrentOrganization, signOut }: any =
    useContext(AuthContext);
  return {
    user,
    setUser,
    notify,
    setCurrentOrganization,
    signOut
  };
};
