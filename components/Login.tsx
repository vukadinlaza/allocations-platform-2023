'use client';
/* eslint-disable react/no-unescaped-entities */
import { useAuthContext } from 'app/(private)/context';
import { useSupabase } from '@/lib/supabase-provider';
import Alert from '@mui/material/Alert';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from './Button';
import Signup from './Signup';

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
  const { setUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signup, setSignup] = useState<boolean>(false);
  const [option, setOption] = useState<string>('magic');

  const loginWithMagicLink = async () => {
    if (!isValidEmail(email)) return alert('Please enter a valid email');
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

  const loginWithPassword = async () => {
    if (!isValidEmail(email)) return alert('Please enter a valid email');
    if (!password) return alert('Please enter your password');
    setStatus(null);
    if (!isValidEmail(email)) {
      return setStatus({
        type: 'error',
        message: 'Invalid email'
      });
    }
    try {
      setLoading(true);

      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error)
        return setStatus({
          type: 'error',
          message: 'Email/password invalid..'
        });

      if (data && data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-5">
      <div className="grid p-6 bg-white md:p-8 md:col-span-2">
        <div className="my-auto">
          <>
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
            {!signup && (
              <div className="w-full">
                <header className="mb-6">
                  <h2 className="mb-2 text-xl">Welcome back.</h2>
                  <p>
                    Sign in utilizing your Allocations email below. If you are
                    not yet registered, it will create an account for you.
                  </p>
                </header>
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
                    {option === 'password' && (
                      <input
                        value={password}
                        type="text"
                        id="outlined-basic"
                        placeholder="Your password"
                        className="w-full mb-4"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    )}
                  </div>
                  {status && (
                    <Alert severity={status.type}>{status.message}</Alert>
                  )}
                  <div className="grid gap-2">
                    <Button
                      color="primary btn--big"
                      onClick={() =>
                        option !== 'password'
                          ? loginWithMagicLink()
                          : loginWithPassword()
                      }
                      loading={loading}
                      label={'Login'}
                    />
                    {/* <div className="grid gap-4 mt-4 text-center">
                      <p
                        className="text-base font-medium cursor-pointer text-primary-500"
                        onClick={() =>
                          setOption(
                            option === 'password' ? 'magic' : 'password'
                          )
                        }
                      >
                        {option === 'password'
                          ? 'Login with magic link'
                          : 'Login with password'}
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
            {signup && <Signup />}
          </>
          {/* <div className="grid gap-4 mt-4 text-center">
            <p
              className="text-base font-medium cursor-pointer text-primary-500"
              onClick={() => setSignup(!signup)}
            >
              {!signup ? 'Signup' : 'Login'}
            </p>
          </div> */}
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
