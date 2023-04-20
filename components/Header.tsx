import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/app/config';
import Logo from './Logo';
import AvatarComponent from './Avatar';
import LoadingUserItem from './Loading/UserItem';

export default function Header({ loading }, { loading: boolean }) {
  const pathname = usePathname();
  console.log(loading);
  return (
    <div className="Header">
      <div className="container flex items-center justify-center w-full">
        <div>
          <Logo />
        </div>
        <div className="flex items-center justify-end w-full grow">
          {loading && (
            <div
              className="flex items-center justify-end grow"
              style={{ maxWidth: '300px' }}
            >
              <LoadingUserItem />
            </div>
          )}
          {!loading && (
            <div className="flex items-center justify-end ml-4 grow">
              <ul className="Header--menu grow">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    <li
                      className={`Header--menu--item ${
                        pathname === item.href ? 'active' : 'inactive'
                      }`}
                    >
                      {item.name}
                    </li>
                  </Link>
                ))}
              </ul>
              <AvatarComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
