'use client';

export default function PageHeader({
  header,
  content
}: {
  header: any;
  content?: any;
}) {
  return (
    <header className="flex items-start justify-between mb-4 md:mb-12">
      <div>
        <h1 className="mb-2 md:text-xl">
          <span className="mr-2">{header.name || 'No title'}</span>
          {header.length && (
            <div className="chip chip--small chip--info">{header.length}</div>
          )}
        </h1>
        <p className="text-sm">{header.description || 'No description'}</p>
      </div>
      <div className="flex items-center">{content}</div>
    </header>
  );
}
