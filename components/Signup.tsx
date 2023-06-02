'use client';
/* eslint-disable react/no-unescaped-entities */
import { useSupabase } from '@/lib/supabase-provider';
import { Alert } from '@mui/material';
import { useState } from 'react';
import Button from './Button';

interface EmailStatus {
  type: 'success' | 'error';
  message: string;
}

export const isValidEmail = (email: string | null): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email ? regex.test(email) : false;
};

export default function Signup() {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<EmailStatus | any>({
    type: '',
    message: ''
  });
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signup = async () => {
    if (!isValidEmail(email)) return alert('Please enter a valid email');
    if (!password) return alert('Please enter your password');
    if (password.length < 6)
      return alert('Password should be at least 6 characters');
    setStatus(null);
    try {
      setLoading(true);

      let { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error)
        return setStatus({
          type: 'error',
          message: 'An error occurred, please try again later.'
        });

      return setStatus({
        type: 'success',
        message:
          'Your account has been succesfully created. Please confirm on your email address.'
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <header className="mb-6">
        <h2 className="mb-2 text-xl">Welcome</h2>
        <p>Create a new account.</p>
      </header>
      <div>
        <div>
          <div>
            <input
              value={email}
              type="text"
              id="outlined-basic"
              placeholder="mail@address.com"
              className="w-full mb-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              value={password}
              type="password"
              id="outlined-basic"
              placeholder="Your password"
              className="w-full mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {status && status.type.length > 0 && (
            <Alert severity={status.type}>{status.message}</Alert>
          )}
          <div className="grid gap-2 mt-2">
            <Button
              color="primary btn--big"
              onClick={signup}
              loading={loading}
              label={'Signup'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
