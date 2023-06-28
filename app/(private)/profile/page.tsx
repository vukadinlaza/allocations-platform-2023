'use client';
import Button from '@/components/Button';
import AvatarItem from '@/components/Items/Avatar';
import ModalButton from '@/components/Modal/Button';
import ProfileList from '@/components/Profiles/List';
import NewProfile from '@/components/Profiles/New';
import Select from '@/components/Select';
import PasswordChange from '@/components/User/PasswordChange';
import { useSupabase } from '@/lib/supabase-provider';
import { getFullName } from '@/lib/utils';
import { investor_types } from '@/types/values';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context';

export default function Profile() {
  const { user, setUser } = useAuthContext();
  const [password, setPassword] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { updateUser } = useSupabase();
  const [newUser, setNewUser] = useState(cloneDeep(user));

  const update = async () => {
    const { email, investor_type } = newUser;
    try {
      const response = await updateUser({
        email,
        investor_type
      });

      if (response) {
        setUser((prev: any) => ({ ...prev, investor_type }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    update();
  }, [newUser]);

  return (
    <div className="mx-auto" style={{ maxWidth: 1000 }}>
      <div className="card">
        {user && (
          <header className="relative flex flex-col items-center justify-center w-full gap-4">
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <div className="flex items-center justify-center">
                <AvatarItem size={64} item={user.email} showAdress={false} />
              </div>
              <div className="w-full text-center">
                <h2 className="mb-1 text-2xl">
                  {getFullName(user) || 'No name'}
                </h2>
                <p className="mb-0">{user.email}</p>
              </div>
              <Button
                label={password ? 'Cancel' : 'Change my password'}
                onClick={() => setPassword(!password)}
              />
            </div>
            {password && (
              <div className="mx-auto w-96">
                <PasswordChange onUpdate={() => setPassword(false)} />
              </div>
            )}
          </header>
        )}
      </div>
      <div className="px-6 py-5 mb-6 bg-white border">
        <header className="flex flex-col items-start justify-between mb-6">
          <h2 className="text-xl">Settings</h2>
          <label>Manage your settings.</label>
        </header>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <h2>Type of profile</h2>
            <label>Select if you are an investor of a fund manager.</label>
          </div>
          <div className="w-48">
            <Select
              selected={
                newUser.investor_type === investor_types[0]
                  ? 'Investor'
                  : 'Fund Manager'
              }
              onChange={(investor_type: string) => {
                setNewUser((prev: any) => ({
                  ...prev,
                  investor_type:
                    investor_type === 'Investor'
                      ? investor_types[0]
                      : investor_types[1]
                }));
              }}
              items={investor_types.map((x) =>
                x === investor_types[0] ? 'Investor' : 'Fund Manager'
              )}
            />
          </div>
        </div>
      </div>
      <div className="px-6 py-5 bg-white border">
        <header className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl">Your investor profiles</h2>
            <label>List of your investors profiles.</label>
          </div>
          <ModalButton
            isOpen={modalOpen}
            onChange={(v) => setModalOpen(v)}
            title="Create a new investor profile"
            content={
              <NewProfile
                onCreate={() => {
                  setModalOpen(false);
                }}
              />
            }
          />
        </header>
        <ProfileList details={true} />
      </div>
    </div>
  );
}
