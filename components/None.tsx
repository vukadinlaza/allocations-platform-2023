'use client';

import { Card } from '@mui/material';
import Image from 'next/image';

export default function None({ text }: { text: string }) {
  return (
    <Card className="card" variant="outlined">
      <Image
        alt="None"
        src="/rocket.svg"
        className="mb-4"
        width={75}
        height={75}
      />
      <p>{text || ''}</p>
    </Card>
  );
}
