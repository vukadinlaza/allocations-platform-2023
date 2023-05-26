'use client';
import AvatarItem from '@/components/Items/Avatar';
import PageList from '@/components/Page/List';
import { getFullName } from '@/lib/utils';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Profile() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);

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
    },
  ];

  return (
    <div className="container">
      <Card className="card" variant="outlined">
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
      </Card>
      {cards.map((data, index) => (
        <Card key={index} className="card" variant="outlined">
          <PageList data={data} />
        </Card>
      ))}
    </div>
  );
}
