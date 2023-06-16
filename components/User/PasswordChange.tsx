'use client';
import { useAuthContext } from '@/app/(private)/context';
import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { passwordValidation } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';

export default function PasswordChange({ onUpdate }: { onUpdate: () => any }) {
  const { notify } = useAuthContext();
  const { supabase } = useSupabase();
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const checkPasswordValid = useCallback(() => {
    const result = passwordValidation(newPassword, newPasswordConfirm);
    if (result.success) {
      setPasswordErrors([]);
      return;
    }
    setPasswordErrors(result.error.issues.map((error) => error.message));
  }, [newPassword, newPasswordConfirm]);

  useEffect(() => {
    checkPasswordValid();
  }, [newPassword, newPasswordConfirm]);

  return (
    <div className="px-6 py-5 bg-white border rounded-lg">
      <div className="w-full text-left">
        <h2 id={'password-reset'} className="mb-4 text-xl">
          Change your password
        </h2>
        <div className="flex flex-col gap-2">
          <input
            value={newPassword}
            className="w-full"
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            value={newPasswordConfirm}
            className="w-full"
            type="password"
            placeholder="Confirm New Password"
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
          {newPassword.length > 0 && passwordErrors.length > 0 && (
            <div className={'my-2'}>
              <ul>
                {passwordErrors.map((e, i) => (
                  <li key={'error-' + i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <Button
              onClick={async () => {
                if (
                  newPassword &&
                  newPasswordConfirm &&
                  newPasswordConfirm != '' &&
                  newPassword == newPasswordConfirm
                ) {
                  await supabase.auth.updateUser({ password: newPassword });
                  notify('Your password has been changed successfully', true);
                  setNewPassword('');
                  setNewPasswordConfirm('');
                  onUpdate();
                }
              }}
              disabled={newPassword.length <= 0 || passwordErrors.length > 0}
              label={'Reset Password'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
