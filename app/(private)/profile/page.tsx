'use client';
import AvatarItem from '@/components/Items/Avatar';
import PageList from '@/components/Page/List';
import {getFullName, passwordValidation} from '@/lib/utils';
import Card from '@mui/material/Card';
import {useCallback, useEffect, useState} from 'react';
import {headers_tables} from '../config';
import {useAuthContext} from '../context';
import Button from "@/components/Button";
import {useSupabase} from "@/lib/supabase-provider";

const PasswordChange = () => {
  const {notify} = useAuthContext();
  const {supabase} = useSupabase();
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const checkPasswordValid = useCallback(() => {
    const result = passwordValidation(newPassword, newPasswordConfirm);
    if (result.success) {
      setPasswordErrors([]);
      return;
    }
    setPasswordErrors(result.error.issues.map(error => error.message));
  }, [newPassword, newPasswordConfirm]);

  useEffect(()=>{
    checkPasswordValid();
  }, [newPassword, newPasswordConfirm])

  return (
    <Card sx={{
      p: 2,
      mb: 2
    }}>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div className="w-full text-center">
          <h2 id={'password-reset'} className="mb-1 text-2xl">
            Password Change
          </h2>
          <div className="flex flex-col items-center justify-center w-full gap-4 mt-2">
            <div className={"max-w-md"}>
              <input value={newPassword} className="w-full" type="password" placeholder="New Password"
                     onChange={(e) => setNewPassword(e.target.value)}/>
              <input value={newPasswordConfirm} className="w-full" type="password" placeholder="Confirm New Password"
                     onChange={(e) => setNewPasswordConfirm(e.target.value)}/>
              <div className={"my-2"}/>
              {newPassword.length > 0 && passwordErrors.length > 0 && <ul>
                {passwordErrors.map(e => (<li>{e}</li>))}
              </ul>}
              <Button onClick={async () => {
                if (newPassword && newPasswordConfirm && newPasswordConfirm != '' && (newPassword == newPasswordConfirm)) {
                  await supabase.auth.updateUser({password: newPassword});
                  notify('Your password has been changed successfully', true);
                  setNewPassword('');
                  setNewPasswordConfirm('');
                }
              }}
              disabled={newPassword.length <= 0 || passwordErrors.length > 0}
              label={"Reset Password"}/>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Profile() {
  const {user, notify} = useAuthContext();
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
                  <AvatarItem size={64} item={user.email} showAdress={false}/>
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
      <PasswordChange/>
      {cards.map((data, index) => (
        <Card key={index} className="card" variant="outlined">
          <PageList data={data}/>
        </Card>
      ))}

    </div>
  );
}
