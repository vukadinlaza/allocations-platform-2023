import Image from 'next/image';
import { useState } from 'react';
export default function Feedback() {
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mr-2 cursor-pointer">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center text-xs font-medium transition input hover:bg-gray-100"
      >
        <Image
          src="/message.svg"
          alt="Feedback"
          className="mr-2 opacity-50 text-primary-400"
          width={16}
          height={16}
        />
        <span>Feedback?</span>
      </div>
      {open && (
        <div className="absolute right-0 p-6 bg-white border top-12">
          Zendesk form here
        </div>
      )}
    </div>
  );
}
