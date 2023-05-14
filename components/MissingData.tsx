import Image from 'next/image';
import { openURL } from './Table';
export default function MissingData() {
  return (
    <div className="relative mr-2 cursor-pointer">
      <div
        onClick={() => openURL(`https://tally.so/r/3qaa9G`)}
        className="flex items-center text-xs font-medium transition input hover:bg-gray-100"
      >
        <Image
          src="/missing.svg"
          alt="missing"
          className="mr-2"
          width={16}
          height={16}
        />
        <span>Missing data</span>
      </div>
    </div>
  );
}
