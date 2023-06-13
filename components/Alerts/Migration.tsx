'use client';
import Close from '@mui/icons-material/Close';
import { useState } from 'react';

export default function Migration() {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      {open && (
        <div className="flex items-center gap-2 px-3 py-1 overflow-hidden text-xs rounded-lg text-sky-800 bg-sky-100">
          <span className="mb-0 font-bold whitespace-nowrap">
            New platform migration update —
          </span>
          <span className="hidden md:block whitespace-nowrap">
            Please email support@allocations.com for urgent support requests. We
            appreciate your patience.
            {/* <span
              className="underline cursor-pointer"
              onClick={() =>
                openURL('https://legacy.allocations.com', '_blank')
              }
            >
              https://legacy.allocations.com
            </span> */}
          </span>
          <span className="text-sm cursor-pointer">
            <Close sx={{ fontSize: 20 }} onClick={() => setOpen(false)} />
          </span>
        </div>
      )}
    </>
  );
}
