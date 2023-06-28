'use client';
import Spinner from '@/components/Spinner';
import Image from 'next/image';

export default function InvestmentBoxItem({
  file,
  loading,
  onClick
}: {
  file: any;
  loading?: boolean;
  onClick?: any;
}) {
  return (
    <div
      className={`flex-col items-center justify-center p-4 item hover:text-primary-500 hover:fill-primary-500 ${
        loading ? 'disabled' : ''
      }`}
    >
      {loading && (
        <div className="flex items-center justify-center w-16 h-16">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="flex items-center justify-center w-16 h-16">
          <Image
            src="/document.svg"
            alt={'document'}
            className="mb-4 opacity-10"
            width={48}
            height={48}
          />
        </div>
      )}
      {file.name && (
        <span className="text-xs font-medium capitalize">{file.name}</span>
      )}
    </div>
  );
}
