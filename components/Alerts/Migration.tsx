'use client';
import { useState } from 'react';
import Alert from '../Alert';

export default function Migration() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      {open && (
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
      )}
    </>
  );
}
