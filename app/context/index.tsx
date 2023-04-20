'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import Header from '@/components/Header';
import { Alert, Collapse, IconButton, dividerClasses } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import supabase from '@/lib/supabase';
import Login from '@/components/Login';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betaAlert, hasBetaAlert] = useState(true);

  const onAuthStateChange = async () => {
    try {
      setLoading(true);
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && session.user) {
        setUser(session.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
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
      <Header loading={loading} />
      <div className="container px-2 my-6">
        {!user && <Login />}
        {user && (
          <div>
            <Collapse in={betaAlert}>
              <Alert
                className="mb-6 text-center"
                icon={false}
                variant="filled"
                color="primary"
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
                <span className="font-bold text-white">
                  Allocations.com bêta
                </span>
                <span className="font-medium text-white">
                  — Welcome to our new software !
                </span>
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