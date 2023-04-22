'use client';

import { Card } from '@mui/material';

export default function Organizations() {
  return (
    <main>
      <Card className="mb-8 card" variant="outlined">
        <header className="flex items-start justify-between w-full mb-8">
          <div>
            <h1>Organizations</h1>
            <p>Manage your organizations.</p>
          </div>
        </header>
      </Card>
      <Card className="card" variant="outlined">
        <header className="flex items-start justify-between w-full mb-8">
          <div>
            <h1>Entities</h1>
            <p>Manage your entities.</p>
          </div>
        </header>
      </Card>
    </main>
  );
}
