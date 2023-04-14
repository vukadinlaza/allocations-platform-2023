'use client';
import Navbar from './navbar';
import { getSession } from 'next-auth/react';

export default async function Nav() {
  const session = await getSession();
  return <Navbar user={session?.user} />;
}
