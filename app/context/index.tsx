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
import Chip from '@mui/material/Chip';
import { SpaceDashboardOutlined } from '@mui/icons-material';

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

      console.log(session.user);

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
      user: user || null
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
                icon={<SpaceDashboardOutlined className=" text-primary" />}
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="primary"
                    size="small"
                    onClick={() => {
                      hasBetaAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" className="text-primary" />
                  </IconButton>
                }
              >
                <h2 className="mt-0">Welcome to Allocations v2.0 !</h2>
                <span>
                  Welcome to our beta fund administration platform, where you
                  can experience the latest features and help us shape the
                  future of our new product.
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
  const { user } = useContext(AuthContext);
  return { user };
};
