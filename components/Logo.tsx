'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Image
      src="/logo.png"
      alt="Allocations.com"
      width={128}
      height={19}
      className="cursor-pointer"
      onClick={() => router.push('/')}
    />
  );
}
