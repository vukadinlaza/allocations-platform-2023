'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';

export default function Verify({ searchParams }: { searchParams: any }) {
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== undefined && searchParams.token) {
      console.log('Got token')
      setTimeout(() => {
        console.log('timeout handled');
        router.push(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=${searchParams.token}&type=magiclink&redirect_to=https://dashboard.allocations.com`
        );
      }, 500);
    }
  }, [searchParams]);

  return <>
    Validating Login...
    <Typography sx={{color: 'white'}}>{searchParams.token}</Typography>
  </>;
}
