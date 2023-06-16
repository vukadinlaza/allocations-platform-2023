'use client';
import Button from '@/components/Button';
import { IdentityList } from '@/components/Identity/List';
import AvatarItem from '@/components/Items/Avatar';
import PageList from '@/components/Page/List';
import PasswordChange from '@/components/User/PasswordChange';
import { getFullName } from '@/lib/utils';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Profile() {
  const { user, notify } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);

  const cards = [
    {
      header: {
        name: 'Investment Identities',
        description: 'Manage your investment identities.',
        buttons: [
          {
            type: 'users_entity'
          }
        ]
      },
      table: {
        element: 'investment entity',
        headers: headers_tables.investments_entities,
        origin: 'identities',
        target: 'identities',
        query: '*'
      }
    }
  ];

  return (
    <div className="container">
      <div className="card">
        {user && (
          <header className="relative flex flex-col items-center justify-center w-full gap-4">
            {!edit && (
              <div className="flex flex-col items-center justify-center w-full gap-4">
                <div className="mx-auto">
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
            )}
            {password && (
              <div className="mx-auto w-96">
                <PasswordChange onUpdate={() => setPassword(false)} />
              </div>
            )}
            {/* {edit && <UserEdit user={user} onUpdate={setEdit(!edit)} />}
            {!edit && (
              <div className="absolute top-0 right-0">
                <Button
                  icon={
                    <Image
                      src="/pen.svg"
                      alt={'Edit'}
                      className="ml-auto opacity-25 cursor-pointer text-gray"
                      width={16}
                      height={16}
                    />
                  }
                  color="info"
                  onClick={() => setEdit(!edit)}
                  label={'Edit'}
                ></Button>
              </div>
            )} */}
          </header>
        )}
      </div>
      <div className="px-6 py-5 bg-white border">
        <header className="mb-6">
          <h2 className="text-xl">Your identities</h2>
          <label>List of your identities.</label>
        </header>
        <IdentityList details={true} onSelect={() => {}} />
      </div>
      {cards.map((data, index) => (
        <Card key={index} className="card" variant="outlined">
          <PageList data={data} />
        </Card>
      ))}
    </div>
  );
}
