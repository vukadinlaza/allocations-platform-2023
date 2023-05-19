export default function ChipStatus({
  status,
  small = false
}: {
  status: string | null | undefined;
  small?: boolean;
}) {
  const colors: any = {
    archived: 'bg-gray-600',
    draft: 'bg-gray-300',
    closed: 'bg-green-500',
    processing: 'bg-amber-400',
    build: 'bg-yellow-500',
    committed: 'bg-orange-500',
    onboarding: 'bg-amber-400',
    signed: 'bg-amber-400',
    complete: 'bg-green-500',
    completed: 'bg-green-500',
    null: 'bg-zinc-400',
    wired: 'bg-green-500',
    crypto: 'bg-primary-500'
  };
  return (
    <div
      className={`inline text-white capitalize rounded-full ${
        small ? 'px-2 py-1 text-sm' : 'px-4 py-2'
      } items-center ${
        status && colors[status.toLowerCase()]
          ? colors[status.toLowerCase()]
          : null
      }`}
    >
      {status}
    </div>
  );
}
