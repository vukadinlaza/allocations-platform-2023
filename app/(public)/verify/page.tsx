'use client';
import LoadingApp from '@/components/Loading/App';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Verify({ searchParams }: { searchParams: any }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined && searchParams.confirmation_url) {
      setTimeout(() => {
        router.push(searchParams.confirmation_url);
      }, 500);
    }
  }, [searchParams]);

  return (
    <>
      <LoadingApp />
      <Typography sx={{ color: 'white' }}>{searchParams.token}</Typography>
    </>
  );
}
