'use client';
import Button from '@/components/Button';
import { getFirstLetter } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export default function DocumentsRow({ document }: { document: any }) {
  const [loading, setLoading] = useState<boolean>(false);

  console.log(document);
  return (
    <div className="item">
      <div className="flex items-center gap">
        <div className="item--thumbnail">
          {document.investment_email &&
            getFirstLetter(document.investment_email)}
        </div>
        {document.investment_email && (
          <label>{document.investment_email}</label>
        )}
      </div>
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
