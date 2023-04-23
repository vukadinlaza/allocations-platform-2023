'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import Header from '@/components/Header';
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import supabase from '@/lib/supabase';
import Login from '@/components/Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betaAlert, hasBetaAlert] = useState(true);

  const fetchUser = async (email: string) => {
    if (!email) return;
    try {
      const { data } = await supabase
        .from('users')
        .select(
          `*,
          users_organizations (
            *
          )`
        )
        .single();

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onAuthStateChange = async () => {
    try {
      setLoading(true);
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && session.user) {
        const user_infos = await fetchUser(session.user.email);
        setUser({
          ...session.user,
          infos: user_infos,
          organizations: user_infos.users_organizations
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  const value = useMemo(() => {
    return {
      user: user || null,
      signOut: () => supabase.auth.signOut()
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {user && <Header loading={loading} />}
      <div className="container px-2 my-6">
        {!user && !loading && <Login />}
        {user && (
          <div>
            <Collapse in={betaAlert}>
              <Alert
                className="mb-6 "
                icon={<FiberNewIcon />}
                variant="filled"
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      hasBetaAlert(false);
                    }}
                  >
                    
                    <CloseIcon fontSize="inherit" className="text-white" />
                  </IconButton>
                }
              >
                <AlertTitle>Allocations Beta</AlertTitle>
                    Welcome to our beta fund administration platform, where you can experience the latest features and help us shape the future of our product! 
              </Alert>
            </Collapse>
            {children}
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, signOut } = useContext(AuthContext);
  return { user, signOut };
};
