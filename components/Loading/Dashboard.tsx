'use client';

export default function LoadingDashboard() {
  return (
    <div className="grid gap-8">
      <div>
        <header className="flex items-start justify-start mb-16">
          <div className="h-8 mb-2 w-72 loading" />
          <div className="w-32 h-12 mb-4 loading" />
        </header>
        <main className="grid grid-cols-2 gap-8">
          <div className="w-full mb-2 h-80 loading" />
          <div className="w-full mb-2 h-80 loading" />
          <div className="w-full mb-2 h-80 loading" />
          <div className="w-full mb-2 h-80 loading" />
        </main>
      </div>
    </div>
  );
}
