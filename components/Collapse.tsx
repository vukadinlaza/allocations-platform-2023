import { useState } from 'react';
export default function Collapse({ header, content }: any) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="rounded-lg">
      <div
        className="transition cursor-pointer hover:opacity-80"
        onClick={() => setOpen(!open)}
      >
        {header}
      </div>
      {open && <div className="py-2">{content}</div>}
    </div>
  );
}
