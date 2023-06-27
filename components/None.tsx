'use client';

import Image from 'next/image';

export default function None({
  text,
  content
}: {
  text: string;
  content?: any;
}) {
  return (
    <div className="flex flex-col items-center justify-center container--card">
      <Image
        alt="None"
        src="/no_file.svg"
        className="mb-4 opacity-10"
        width={75}
        height={75}
      />
      <div className={content ? 'mb-4' : ''}>
        <label>{text || ''}</label>
      </div>
      {content}
    </div>
  );
}
