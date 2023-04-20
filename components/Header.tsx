import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/app/config';
import Logo from './Logo';

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="Header">
      <div className="container flex items-center justify-start w-full">
        <Logo />
        <div className="Header-menu">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
