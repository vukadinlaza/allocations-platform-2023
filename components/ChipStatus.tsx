export default function ChipStatus({
  status
}: {
  status: string | null | undefined;
}) {
  const colors: any = {
    archived: 'bg-gray-600',
    draft: 'bg-gray-300',
    closed: 'bg-green-500',
    processing: 'bg-amber-400',
    build: 'bg-yellow-500',
    'post-build': 'bg-orange-500',
    'pre-onboarding': 'bg-amber-400',
    onboarding: 'bg-amber-400',
    signed: 'bg-amber-400',
    complete: 'bg-green-500',
    null: 'bg-zinc-400',
    wired: 'bg-green-500'
  };
  return (
    <div
      className={`inline text-white capitalize rounded-full px-4 py-2 items-center ${
        status ? colors[status.toLowerCase()] : null
      }`}
    >
      {status}
    </div>
  );
}
