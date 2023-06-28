'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import { useState } from 'react';

export default function DocumentsRow({ document }: { document: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="item">
      <p>hello</p>
      <Button
        label="Download"
        loading={loading}
        icon={
          <Image
            src={'/download.svg'}
            alt="download"
            className="opacity-50 invert "
            width={24}
            height={24}
          />
        }
        onClick={() => {}}
      />
    </div>
  );
}
