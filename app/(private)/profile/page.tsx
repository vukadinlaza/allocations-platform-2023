'use client';
import Button from '@/components/Button';
import AvatarItem from '@/components/Items/Avatar';
import ModalButton from '@/components/Modal/Button';
import ProfileList from '@/components/Profiles/List';
import NewProfile from '@/components/Profiles/New';
import PasswordChange from '@/components/User/PasswordChange';
import { getFullName } from '@/lib/utils';
import { useState } from 'react';
import { useAuthContext } from '../context';

export default function Profile() {
  const { user } = useAuthContext();
  const [password, setPassword] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="container">
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
