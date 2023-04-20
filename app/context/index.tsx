'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import Header from '@/components/Header';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const onAuthStateChange = async () => {
  //   try {
  //     const {
  //       data: { user }
  //     } = await supabase.auth.getUser();
  //     if (user) {
  //       setUser(user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // };

  // useEffect(() => {
  //   onAuthStateChange();
  // }, []);

  const value = useMemo(() => {
    return {
      user: user || null
      // signOut: () => supabase.auth.signOut()
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      <Header />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return {};
};
// export const useAuthContext = () => {
//   const { user, signOut } = useContext(AuthContext);
//   return { user, signOut };
// };
