import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RedirectDeal() {
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const router = useRouter();

  const redirect = () => {
    if (!params.id) {
      return router.push(`deals/${params.id}`);
    }
    return '/';
  };

  useEffect(() => {
    redirect();
  }, []);

  return <></>;
}
