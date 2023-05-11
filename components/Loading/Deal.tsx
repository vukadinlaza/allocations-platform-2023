'use client';

export default function LoadingDeal() {
  return (
    <div className="container mb-12">
      <header className="flex items-center justify-between my-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-72 loading" />
          <div className="w-32 h-8 rounded-full loading" />
        </div>
        <div className="w-32 h-10 loading" />
      </header>
      <main>
        <div className="w-full mb-8 loading" style={{ height: '500px' }} />
        <div className="grid grid-cols-5 gap-8 mb-8">
          <div className="h-32 loading" />
          <div className="h-32 loading" />
          <div className="h-32 loading" />
          <div className="h-32 loading" />
          <div className="h-32 loading" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full h-12 loading"></div>
          <div className="w-full h-8 loading"></div>
          <div className="w-full h-64 loading"></div>
          <div className="w-full h-8 loading"></div>
        </div>
      </main>
    </div>
  );
}
