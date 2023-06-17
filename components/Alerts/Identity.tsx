'use client';
import { useState } from 'react';
import Alert from '../Alert';
import { openURL } from '../Table';

export default function Migration() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      {open && (
        <Alert
          color="text-amber-800 bg-amber-50"
          content={
            <div className="flex gap-1">
              <span className="mb-0 font-bold whitespace-nowrap">
                Incomplete identities
              </span>
              <span className="hidden cursor-pointer md:block whitespace-nowrap">
                — Please{' '}
                <span className="underline" onClick={() => openURL('/profile')}>
                  click here to verify your identities.
                </span>
              </span>
            </div>
          }
        />
      )}
    </>
  );
}
