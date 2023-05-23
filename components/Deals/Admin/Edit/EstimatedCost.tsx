import { Deal } from '@/types';
import { useState } from 'react';

export default function EstimatedCosts({ deal }: { deal: Deal }) {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className='w-full'>
      <header className='flex flex-col items-start mb-6'>
        <h2 className='text-xl'>Estimated costs</h2>
      </header>
    </div>);
}
