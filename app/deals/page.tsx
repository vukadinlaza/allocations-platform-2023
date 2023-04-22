'use client';

import { Card } from '@mui/material';

export default function Deals() {
  return (
    <main>
      <Card className="mb-8 card" variant="outlined">
        <header className="flex items-start justify-between w-full mb-8">
          <div>
            <h1>Deals</h1>
            <p>Manage your deals.</p>
          </div>
        </header>
      </Card>
    </main>
  );
}
