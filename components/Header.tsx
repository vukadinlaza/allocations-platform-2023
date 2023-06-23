'use client';

import { navigation } from '@/app/(private)/config';
import AlertsIdentity from '@/components/Alerts/Identity';
import AlertsMigration from '@/components/Alerts/Migration';
import { useAuthContext } from 'app/(private)/context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NewDeal from './Deals/New';
import Logo from './Logo';
import MenuAvatar from './MenuAvatar';
import MissingData from './MissingData';
import ModalButton from './Modal/Button';

export default function Header({
  expand,
  setExpand
}: {
  expand: boolean;
  setExpand: any;
}) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="header">
      <div className="flex items-center justify-center w-full border-b rounded">
        <div className="flex w-full px-5 py-2">
          <div className="flex items-center gap-4 grow">
            <Logo />
            {!user.missing_identities && <AlertsMigration />}
            {user.missing_identities && <AlertsIdentity />}
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
        <div className="flex items-center gap-2 mr-2">
          <ModalButton
            isOpen={modalOpen}
            onChange={setModalOpen}
            title="Create a new deal"
            label="Create a new deal"
            content={
              <NewDeal selectType={true} onCreate={() => setModalOpen(false)} />
            }
          />
          {/* <div
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
