'use client';
import { useState } from 'react';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import supabase from '@/lib/supabase';

interface EmailStatus {
  type: 'success' | 'error';
  message: string;
}

export const isValidEmail = (email: string | null): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const login = async () => {
    setStatus(null);
    if (!isValidEmail(email)) {
      return setStatus({
        type: 'error',
        message: 'Invalid email'
      });
    }
    try {
      setLoading(true);

      let { data } = await supabase.auth.signInWithOtp({
        email
      });

      if (data) {
        setEmail(null);
        setStatus({
          type: 'success',
          message: 'An email has been successfully sent to your mailbox.'
        });
      }
    } catch (err) {
      console.log(err);
      setStatus({
        type: 'error',
        message: 'An error occurred, please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-8 mx-auto bg-white border rounded-lg"
      style={{ width: '400px' }}
    >
      <div className="mb-4">
        <Logo />
      </div>
      <p className="mb-4">
        Welcome to Allocations v2.0.
        <br />
        Please enter your e-mail to login.
      </p>
      {!status && (
        <div>
          <TextField
            id="outlined-basic"
            label="mail@address.com"
            variant="outlined"
            className="w-full mb-4"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
      {status && <Alert severity={status.type}>{status.message}</Alert>}
      {!status && (
        <button
          onClick={login}
          className={`mt-4 btn primary ${loading ? 'loading' : ''}`}
        >
          {loading && <CircularProgress color="inherit" size={12} />}
          {!loading && 'Sign in'}
        </button>
      )}
    </div>
  );
}
