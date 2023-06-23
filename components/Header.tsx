'use client';

import { navigation } from '@/app/(private)/config';
import Alert from '@/components/Alert';
import { useAuthContext } from 'app/(private)/context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <div className="header">
      <div className="flex items-center justify-center w-full border-b rounded">
        <div className="flex w-full px-5 py-2">
          <div className="flex items-center gap-4 grow">
            <Logo />
            <Alert
              color="text-sky-800 bg-sky-50"
              content={
                <div className="flex gap-2">
                  <span className="mb-0 font-bold whitespace-nowrap">
                    New platform migration update —
                  </span>
                  <span className="hidden md:block whitespace-nowrap">
                    Please email support@allocations.com for urgent support
                    requests. We appreciate your patience.
                  </span>
                </div>
              }
            />
          </div>
          <div className="flex items-center justify-end">
            {user && (
              <div className="flex items-center justify-end ml-4">
                <div className="flex items-center justify-between">
                  <MissingData />
                  <MenuAvatar />
                </div>
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
          {/* <ModalButton
            isOpen={modalOpen}
            onChange={setModalOpen}
            title="Create a new deal"
            label="Create a new deal"
            content={
              <NewDeal selectType={true} onCreate={() => setModalOpen(false)} />
            }
          /> */}
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
      {user.missing_identities && (
        <Alert
          color="text-red-600 bg-red-100 cursor-pointer hover:bg-red-200 transition"
          close={false}
          content={
            <div className="flex items-center justify-center gap-2 py-3 text-sm text-center">
              <span className="mb-0 font-bold whitespace-nowrap">
                Identity is missing
              </span>
              <span className="hidden gap-2 md:flex whitespace-nowrap">
                <span>
                  — Please complete your identity information before proceeding
                  with any investments.
                </span>
                <span className="underline">
                  Click here to check your identities.
                </span>
              </span>
            </div>
          }
        />
      )}
    </div>
  );
}
