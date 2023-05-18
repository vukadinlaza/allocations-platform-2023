import Image from 'next/image';
import { useState } from 'react';

export default function Feedback() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="relative mr-2 cursor-pointer">
      <div
        onClick={() => {
          // @ts-ignore
          Tally.openPopup('3jbbja', {
            layout: 'modal', // Open as a centered modal
            width: 700, // Set the width of the modal
            autoClose: 5000 // Close the popup 5 seconds after form was submitted (in ms)
          });
        }}
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
