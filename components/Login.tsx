'use client';
/* eslint-disable react/no-unescaped-entities */
import { useSupabase } from '@/lib/supabase-provider';
import Alert from '@mui/material/Alert';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from './Button';
import { openURL } from './Table';

interface EmailStatus {
  type: 'success' | 'error';
  message: string;
}

export const isValidEmail = (email: string | null): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email ? regex.test(email) : false;
};

export default function Login() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [email, setEmail] = useState<string>('');

  const login = async () => {
    if (!email) return;
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
        email,
        options: {
          emailRedirectTo: window.location.href
        }
      });

      if (data) {
        setEmail('');
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
    <div className="grid h-screen grid-cols-1 lg:grid-cols-5">
      <div className="flex items-center justify-center p-6 bg-white md:p-8 md:col-span-2">
        <div className="w-full lg:pb-24">
          <header className="mb-6">
            <div className="mb-8 md:mb-16 lg:mb-20">
              <Image
                src="/logo.png"
                alt="Allocations.com"
                width={200}
                height={30}
                className="cursor-pointer"
                onClick={() => router.push('/')}
              />
            </div>
            <h2 className="mb-2 text-xl">Welcome back.</h2>
            <p>
              Sign in to your account. If you are not yet registered, it will
              create an account for you.
            </p>
          </header>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await login();
            }}
          >
            {!status && (
              <div>
                <input
                  value={email}
                  type="text"
                  id="outlined-basic"
                  placeholder="mail@address.com"
                  className="w-full mb-4"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {status && <Alert severity={status.type}>{status.message}</Alert>}
            {!status && (
              <div className="grid">
                <Button
                  color="primary btn--big"
                  onClick={login}
                  loading={loading}
                  label="Login"
                />
                <Alert severity="warning" className="my-4">
                  <div className="mb-1 font-bold">
                    Authentication issues reported
                  </div>
                  <div>
                    We are currently facing some issues with a third-party
                    vendor's authentication service. Our team is working on
                    addressing this problem. For further information, please
                    visit{' '}
                    <span
                      className="underline cursor-pointer"
                      onClick={() =>
                        openURL(
                          'https://github.com/supabase/supabase/issues/14690'
                        )
                      }
                    >
                      the following link
                    </span>
                    .
                  </div>
                </Alert>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="p-6 text-white md:col-span-3 bg-primary-500 md:p-8 lg:p-12 bg-1">
        <div style={{ maxWidth: 400 }}>
          <h2
            className="mb-4 text-xl md:text-2xl lg:text-4xl"
            style={{ lineHeight: 1.25 }}
          >
            Discover What's New in Allocations 2.0
          </h2>
          <p className="text-base text-white lg:text-lg">
            With Allocations v2.0, users can expect a more stable platform and
            intuitive experience.
          </p>
        </div>
      </div>
    </div>
  );
}
