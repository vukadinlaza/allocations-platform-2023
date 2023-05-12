'use client';

export default function LoadingDeal() {
  return (
    <div className="container grid grid-cols-6 gap-8 mt-8 deal">
      <div className="col-span-4">
        <header className="flex items-start justify-start mb-16">
          <div className="flex items-center justify-center w-16 h-16 mt-1 mr-4 text-white rounded loading" />
          <div className="flex flex-col items-start gap-2 grow">
            <div className="h-8 mb-2 w-72 loading" />
            <div className="w-32 h-8 loading" />
          </div>
          <div>
            <div className="w-32 h-12 mb-4 loading" />
          </div>
        </header>
        <main>
          <div className="mb-8">
            <div className="h-12 mb-8 w-72 loading" />
            <div className="w-full h-8 mb-2 loading" />
            <div className="w-5/6 h-8 mb-2 loading" />
            <div className="w-4/6 h-8 mb-2 loading" />
          </div>
          <div>
            <div className="h-12 mb-8 w-72 loading" />
            <div className="w-full h-8 mb-2 loading" />
            <div className="w-5/6 h-8 mb-2 loading" />
            <div className="w-4/6 h-8 mb-2 loading" />
          </div>
        </main>
      </div>
      <div className="col-span-2">
        <div className="h-96 w-72 loading" />
      </div>
    </div>
  );
}
