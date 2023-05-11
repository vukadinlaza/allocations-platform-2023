'use client';

export default function LoadingDeal() {
  return (
    <header className="grid grid-cols-4 gap-4 h-96">
      <div className="col-span-2 loading"></div>
      <div className="grid grid-cols-2 col-span-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="h-12 loading"></div>
          <div className="w-64 h-12 loading"></div>
          <div className="w-48 h-12 loading"></div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="w-64 h-20 loading"></div>
          <div className="w-64 h-20 loading"></div>
        </div>
      </div>
    </header>
  );
}
