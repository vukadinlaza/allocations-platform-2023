export default function ChipStatus({
  status
}: {
  status: string | null | undefined;
}) {
  const colors: any = {
    archived: 'bg-gray-600',
    closed: 'bg-green-500',
    processing: 'bg-amber-400',
    build: 'bg-yellow-500',
    onboarding: 'bg-amber-400',
    complete: 'bg-primary-500',
    null: 'bg-zinc-400'
  };
  return (
    <div
      className={`text-white capitalize rounded-full px-4 py-2 items-center ${
        status ? colors[status.toLowerCase()] : null
      }`}
      style={{ display: 'inherit' }}
    >
      {status}
    </div>
  );
}
