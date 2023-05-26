import Button from '@/components/Button';
import AvatarItem from '@/components/Items/Avatar';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

import { User } from '@/types';

export default function UserForm({
  user,
  onUpdate
}: {
  user: any;
  onUpdate: any;
}) {
  const [newUser, setNewUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { updateUser } = useSupabase();

  const update = async () => {
    try {
      setLoading(true);

      const response = await updateUser(user.email, newUser);

      if (response) {
        onUpdate();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keys = ['first_name', 'last_name'];
    const _newUser: any = {};

    for (const key of keys) {
      if (key in user) {
        _newUser[key] = user[key];
      }
    }

    setNewUser(_newUser);
  }, [user]);

  return (
    <div className="w-full mx-auto">
      {user && newUser && (
        <div className="grid grid-cols-1 gap-4">
          <div className="mx-auto">
            <AvatarItem size={64} item={user.email} showAdress={false} />
          </div>
          <div className="grid grid-cols-1 gap-2 mx-auto text-center w-80">
            <input
              type="text"
              value={newUser.first_name || ''}
              placeholder="Your first name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewUser((prevData: any) => ({
                  ...prevData,
                  first_name: e.target.value
                }))
              }
            />
            <input
              type="text"
              value={newUser.last_name || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewUser((prevData: any) => ({
                  ...prevData,
                  last_name: e.target.value
                }))
              }
            />
            <input
              type="text"
              className="disabled"
              value={user.email || ''}
              disabled
            />
            <p className="mb-4 text-xs cursor-pointer hover:underline hover:opacity-80">
              How to update my e-mail address?
            </p>
            <Button
              loading={loading}
              onClick={update}
              label={'Update'}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
}
