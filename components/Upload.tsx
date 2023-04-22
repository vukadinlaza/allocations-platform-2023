import Image from 'next/image';

export default function Upload() {
  return (
    <div className="upload">
      <div className="flex flex-col items-center">
        <Image
          src="/upload.svg"
          className="text-primary"
          width={48}
          height={48}
        />
      </div>
    </div>
  );
}
