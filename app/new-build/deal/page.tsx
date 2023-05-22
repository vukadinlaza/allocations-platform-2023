'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RedirectDeal() {
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const router = useRouter();

  const redirect = () => {
    if (!params.id) {
      // return router.push(`deals/${params.id}`);
      // query
    }
    return '/';
  };

  useEffect(() => {
    redirect();
  }, []);

  return <></>;
}
