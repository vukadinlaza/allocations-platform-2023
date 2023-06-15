'use client';

export default function PageHeader({
  header,
  content
}: {
  header: any;
  content?: any;
}) {
  return (
    <header className="pb-4 md:pb-6">
      <div>
        <h1 className="mb-2 md:text-2xl">
          <span className="mr-2">{header.name || 'No title'}</span>
          {header.length && (
            <div className="chip chip--small chip--info">{header.length}</div>
          )}
        </h1>
        <p className="text-sm md:text-base">
          {header.description || 'No description'}
        </p>
      </div>
      <div className="flex items-center">{content}</div>
    </header>
  );
}
