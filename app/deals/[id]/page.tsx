'use client';

import LoadingDeal from '@/components/Loading/Deal';

import { useState } from 'react';
export default function DealID() {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className="w-full deal">
      {loading && <LoadingDeal />}
      {!loading && <div>hello deal</div>}
    </div>
  );
}
