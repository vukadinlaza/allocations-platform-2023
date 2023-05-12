import { useState } from 'react';
export default function KYC() {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div>
      <header className="mb-8">
        <h2 className="text-lg font-bold">Personal information</h2>
        <p className="text-sm">
          Required by United Stated banking laws. This information is{' '}
          <span className="text-primary-500">kept secure</span>. It will never
          be used fo any purpose beyond executing your investment.
        </p>
      </header>
      <main>
        <button className="flex items-center btn primary">
          <span>Verify my identity</span>
        </button>
      </main>
    </div>
  );
}
