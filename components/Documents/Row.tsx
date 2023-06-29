'use client';
import Button from '@/components/Button';
import DateComponent from '@/components/DateComponent';
import { AllocationsAPI } from '@/lib/allocations-api';
import { downloadFile, getFirstLetter } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export default function DocumentsRow({
  document,
  dealDocuments
}: {
  document: any;
  dealDocuments?: any;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="gap-4 bg-white item">
      <div className="flex items-center gap" style={{ minWidth: 300 }}>
        <div className="item--thumbnail">
          {document.name && getFirstLetter(document.name)}
        </div>
        <div className="flex flex-col">
          {document.name && (
            <p className="text-sm font-medium">{document.name}</p>
          )}
          {document.created_at && (
            <label className="text-xs">
              <DateComponent date={document.created_at} />
            </label>
          )}
        </div>
      </div>
      <div className="flex items-start justify-start w-full">
        {document.type && (
          <label className="text-sm">
            {document.type}
          </label>
        )}
      </div>
      <Button
        label="Download"
        loading={loading}
        small={true}
        icon={
          <Image
            src={'/download.svg'}
            alt="download"
            className="opacity-50 invert "
            width={24}
            height={24}
          />
        }
        onClick={async () => {
          setLoading(true);
          const response = await AllocationsAPI.downloadZipFile(
            dealDocuments.map((d: any) => d.id)
          );
          if (response.ok) {
            await downloadFile(await response.blob(), `download.zip`);
          } else {
            console.error('Failed to download the document');
          }
          setLoading(false);
        }}
      />
      <Button
        label="View"
        loading={loading}
        small={true}
        icon={
          <Image
            src={'/eye.svg'}
            alt="download"
            className="opacity-50 invert"
            width={24}
            height={24}
          />
        }
        onClick={async () => {
          setLoading(true);
          const response = await AllocationsAPI.downloadPDFFile(document.id);
          if (response.ok) {
            const fileURL = window.URL.createObjectURL(await response.blob());
            window.open(fileURL);
          } else {
            console.error('Failed to download the document');
          }
          setLoading(false);
        }}
      />
    </div>
  );
}
