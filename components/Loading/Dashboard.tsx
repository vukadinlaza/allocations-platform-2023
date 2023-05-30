'use client';

export default function LoadingDashboard() {
  return (
    <div className="grid w-full gap-8">
      <div className="w-full">
        <header className="flex items-start justify-between w-full mb-8">
          <div className="h-8 mb-2 w-72 loading" />
          <div className="w-32 h-12 mb-4 loading" />
        </header>
        <div className="grid grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((x, i) => (
            <div key={i} className="w-full h-24 mb-2 loading" />
          ))}
        </div>
        <div className="w-full my-8">
          {Array.from({ length: 12 }).map((x, i) => (
            <div key={i} className="w-full h-12 mb-2 loading" />
          ))}
        </div>
      </div>
    </div>
  );
}
