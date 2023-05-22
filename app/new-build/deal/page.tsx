'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RedirectDeal({ searchParams }: { searchParams: any }) {
  const router = useRouter();

  const redirect = () => {
    if (searchParams.id) {
      return router.replace(`deals/${searchParams.id}`);
    }

    return '/';
  };

  useEffect(() => {
    redirect();
  }, []);

  return <></>;
}
