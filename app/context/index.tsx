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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [betaAlert, hasBetaAlert] = useState(true);
  const [slideOverData, setSlideOverData] = useState({});

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
              *,
              entities (
                *
              )
            )
          )`
        )
        .eq('email', email)
        .single();

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        // current user + merge users_organizations * organizations
        const user_infos = await fetchUser(session.user);

        // build user here: function to build a user?

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
      user,
      open,
      setCurrentOrganization: (orgId: string) =>
        setUser((prev: any) => ({ ...prev, currentOrganization: orgId })),
      setSlideOver,
      signOut
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
            {/* <SlideOverContent
              data={{
                data: {
                  id: '75087e2b-86c5-4b17-b721-a0c412af6a31',
                  created_at: '2023-04-26T19:35:30.005226+00:00',
                  updated_at: '2023-04-26T19:35:30.005226+00:00',
                  accept_crypto: false,
                  asset_type: 'Startup',
                  carry_fee: '0',
                  closing_date: '2018-12-26T00:00:00.000Z',
                  closed: false,
                  company_name: 'Bakkt',
                  deal_term: '10 years',
                  documents: null,
                  elevated_returns: false,
                  entity_id: 'null',
                  entity_name: 'AS Bruch Fund LLC',
                  international_investors: false,
                  invited_investors: 'null',
                  legacy_manager_email: 'null',
                  legacy_manager_name: 'null',
                  legacy_organization_name: 'null',
                  management_fee: '0',
                  management_fee_dollar: 'null',
                  management_fee_frequency: 'null',
                  management_fee_percent: 'null',
                  management_fee_type: 'null',
                  manager_email: 'null',
                  manager_type: 'individual',
                  minimum_investment: '10000',
                  mongo_id: '5de560a92817ed4e5b8a7afa',
                  mongo_organization_id: '5e4d9a334ffe0530c9350d40',
                  name: 'Bakkt',
                  offering_type: 'null',
                  onboarding_link: 'null',
                  owner_mongo_id: 'null',
                  portfolio_company_name: 'Bakkt',
                  series_name: 'null',
                  setup_cost: '0',
                  side_letters: false,
                  sign_deadline: 'null',
                  status: 'closed',
                  target: 'null',
                  target_raise_goal: '0',
                  total_carry: 'null',
                  total_round_size: 'null',
                  type: 'spv',
                  wire_deadline: '2018-12-27T22:00:00.000Z',
                  user_email: 'null'
                },
                type: 'spvs'
              }}
            /> */}
            {children}
            <SlideOver open={open} setOpen={setOpen} data={slideOverData} />
          </div>
        )}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { user, open, setSlideOver, setCurrentOrganization, signOut }: any =
    useContext(AuthContext);
  return { user, open, setSlideOver, setCurrentOrganization, signOut };
};
