import Close from '@mui/icons-material/Close';
import { useState } from 'react';
export default function Alert({
  content,
  color,
  close = true
}: {
  content: any;
  color?: string;
  close?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <>
      {open && (
        <div
          className={`flex items-center px-3 py-1 overflow-hidden text-xs rounded-lg ${color}`}
        >
          <span>{content}</span>
          {close && (
            <span className="ml-2 text-sm cursor-pointer">
              <Close sx={{ fontSize: 20 }} onClick={() => setOpen(false)} />
            </span>
          )}
        </div>
      )}
    </>
  );
}
