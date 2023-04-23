'use client';

import { Card } from '@mui/material';
import Image from 'next/image';

export default function None({ text }) {
  return (
    <Card className="card" variant="outlined">
      <Image src="/astronomy-launch-rocket-2-svgrepo-com.svg" className="mb-4" width={75} height={75} />
      <p>{text || ''}</p>
    </Card>
  );
}
