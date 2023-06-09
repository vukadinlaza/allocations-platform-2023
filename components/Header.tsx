'use client';

import { navigation } from '@/app/(private)/config';
import AlertsMigration from '@/components/Alerts/Migration';
import { useAuthContext } from 'app/(private)/context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import MenuAvatar from './MenuAvatar';
import MissingData from './MissingData';

export default function Header({
  expand,
  setExpand
}: {
  expand: boolean;
  setExpand: any;
}) {
  const pathname = usePathname();
  const { user, setCurrentOrganization } = useAuthContext();

  return (
    <div className="header">
      <div className="flex items-center justify-center w-full border-b rounded">
        <div className="flex w-full px-5 py-2">
          <div className="flex items-center gap-4 grow">
            <Logo />
            <AlertsMigration />
          </div>
          <div className="flex items-center justify-end">
            {user && (
              <div className="flex items-center justify-end ml-4">
                {user && (
                  <div className="flex items-center justify-between">
                    <MissingData />
                    <MenuAvatar />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-3 overflow-auto">
        {user && (
          <div className="flex items-center justify-start">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                <div
                  className={`header--menu--item ${
                    pathname?.includes(item.name.toLowerCase())
                      ? 'active'
                      : 'inactive'
                  }`}
                >
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="mr-2">
          <div
            className="p-1 transition rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={() => setExpand(!expand)}
          >
            <Image
              src={!expand ? '/expand.svg' : '/shrink.svg'}
              alt="expand"
              className="opacity-50"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
