'use client';
import Navbar from './navbar';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Session } from 'next-auth';

export default function Nav() {
  const [session, setSession] = useState<Session | null>(null);

  const getCurrentSession = async () => {
    const currentSession = await getSession();

    if (currentSession) {
      setSession(currentSession);
    }
    
    return session;
  }

  useEffect(() => {
    getCurrentSession();
  }, [])

  return <Navbar user={session?.user} />;
}
