'use client';
import LoadingApp from '@/components/Loading/App';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Verify({ searchParams }: { searchParams: any }) {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=${searchParams.token}&type=magiclink&redirect_to=http://localhost:3000`
      );
    }, 1000);
  }, []);

  return <>
    <LoadingApp />
  </>;
}
