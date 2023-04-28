'use client';
import Header from '@/components/Header';
import Login from '@/components/Login';
import SlideOver from '@/components/SlideOver';
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
  const [open, setOpen] = useState(false);

  const fetchUser = async (user: any) => {
    const { email } = user;
    if (!email) return;
    try {
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
        const user_infos = await fetchUser(session.user);
        // const user_infos = await fetchUser({
        //   email: 'michelle@allocations.co'
        // });
        let merged = [];
        if (user_infos && user_infos.users_organizations.length > 0) {
          merged = mergeOrganizations(user_infos.users_organizations);
        }
        const build_user: any = {
          ...session.user,
          infos: user_infos || [],
          organizations: merged,
          currentOrganization: merged[0]?.id || null
        };
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
      user: user,
      open: open,
      setCurrentOrganization: (orgId: string) =>
        setUser((prev: any) => ({ ...prev, currentOrganization: orgId })),
      setOpen: setOpen
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
          <div className="px-5 my-6">
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
            <SlideOver open={open} setOpen={setOpen} />
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, open, setOpen, setCurrentOrganization }: any =
    useContext(AuthContext);
  return { user, open, setOpen, setCurrentOrganization };
};
