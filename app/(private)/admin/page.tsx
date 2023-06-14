'use client';
import Button from '@/components/Button';
import LoadingList from '@/components/Loading/List';
import None from '@/components/None';
import UserItem from '@/components/UserItem';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context';
import {AllocationsAPI} from "@/lib/allocations-api";

export default function Admin() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<any>(false);
  const [email, setEmail] = useState<any>(undefined);
  const [usersList, setUsersList] = useState<any>([]);
  const [timeoutID, setTimeoutID] = useState<any>(undefined); // State to store the timeout ID

  const { supabase } = useSupabase();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let { data: users, error } = await supabase
        .from('users')
        .select('*')
        .ilike('email', email+'%');

      if (error) return console.log(error);

      setUsersList(users);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [email]);

  return (
    <div className="container">
      {user && !user.is_super_admin && <None text="You don't have access." />}
      {user && user.is_super_admin && (
        <div className="flex flex-col items-start px-5 py-4 bg-white border rounded-lg">
          <h2>Impersonate as</h2>
          <input
            type="text"
            placeholder={'Type an email address...'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <div className="grid w-full gap-2 my-6">
            {loading && <LoadingList />}
            {!loading &&
              usersList.length > 0 &&
              usersList.map((user: any) => (
                <UserItem
                  key={user.id}
                  user={user}
                  content={<Button label="Impersonate" onClick={async () => {
                    console.log(supabase);
                    const {data:sessionData} = await supabase.auth.getSession();
                    const access_token = sessionData.session?.access_token as string;
                    const response = await AllocationsAPI.impersonate(user.email, access_token);
                    const {data: impersonationPayload} = await response.json();
                    window.open(impersonationPayload.properties.action_link);
                  }} />}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
