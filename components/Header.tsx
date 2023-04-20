import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/app/config';
import Logo from './Logo';
import AvatarComponent from './Avatar';

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="Header">
      <div className="container flex items-center justify-start w-full">
        <div className="mr-6">
          <Logo />
        </div>
        <ul className="Header--menu grow">
          {navigation.map((item) => (
            <li className="Header--menu--item">
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <AvatarComponent />
      </div>
    </div>
  );
}
