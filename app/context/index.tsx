'use client';
import Header from '@/components/Header';
import Login from '@/components/Login';
import supabase from '@/lib/supabase';
import { SpaceDashboardOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({});

const mergeOrganizations = (orgs: any) => {
  if (!orgs) return [];
  return orgs.map((org: any) => {
    let _org = {
      ...org,
      ...org.organizations
    };
    delete _org.organizations;
    return _org;
  });
};

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betaAlert, hasBetaAlert] = useState(true);

  const fetchUser = async (email: string) => {
    if (!email) return;
    try {
      console.log(email);
      const { data } = await supabase
        .from('users')
        .select(
          `*,
        users_organizations (
          *,
          organizations (
            *
          )
        )`
        )
        .eq('email', email)
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
        // current user + merge users_organizations * organizations
        const user_infos = await fetchUser(session.user.email);
        const build_user = {
          ...session.user,
          infos: user_infos,
          organizations: mergeOrganizations(user_infos.users_organizations)
        };
        console.log(build_user);
        setUser(build_user);
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
      setCurrentOrganization: null
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {user && <Header loading={loading} />}
      <div>
        {!user && !loading && (
          <div className="my-12">
            <Login />
          </div>
        )}
        {user && (
          <div className="container px-2 my-6">
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
  const { user, setCurrentOrganization } = useContext(AuthContext);
  return { user, setCurrentOrganization };
};
