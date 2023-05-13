import Image from 'next/image';
import { useState } from 'react';
export default function InvestmentsIdentity() {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div>
      <header className="mb-6">
        <h2 className="text-lg font-bold">Who is investing?</h2>
        <p className="text-sm">You have no identity yet.</p>
      </header>
      <main>
        <button className="text info">
          <Image
            src={'/plus.svg'}
            alt="plus"
            className="mr-2 text-primary-500"
            width={18}
            height={18}
          />
          <span>New investment entity</span>
        </button>
      </main>
    </div>
  );
}
