import Image from 'next/image';
import { useState } from 'react';
import { openURL } from './Table';
export default function Feedback() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="relative mr-2 cursor-pointer">
      <div
        onClick={() => openURL(`https://tally.so/r/3jbbja`)}
        className="flex items-center text-xs font-medium transition input hover:bg-gray-100"
      >
        <Image
          src="/message.svg"
          alt="Feedback"
          className="mr-2"
          width={16}
          height={16}
        />
        <span>Feedback</span>
      </div>
    </div>
  );
}
