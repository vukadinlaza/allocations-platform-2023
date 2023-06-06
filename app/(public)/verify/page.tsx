'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Verify({ searchParams }: { searchParams: any }) {
  const router = useRouter();

  useEffect(() => {
    if(window && searchParams.token) {
      console.log('Got token')
      setTimeout(() => {
        console.log('timeout handled');
        router.push(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=${searchParams.token}&type=magiclink&redirect_to=https://dashboard.allocations.com`
        );
      }, 1000);
    }
  }, [window, searchParams]);

  return <>
    Validating Login...
  </>;
}
