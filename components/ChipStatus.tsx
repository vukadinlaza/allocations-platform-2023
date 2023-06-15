export default function ChipStatus({
  status,
  small = false
}: {
  status: string | null | undefined;
  small?: boolean;
}) {
  const colors: any = {
    admin: 'bg-amber-400',
    archived: 'bg-gray-600',
    draft: 'bg-gray-300',
    closing: 'bg-primary-500',
    closed: 'bg-primary-500',
    invited: 'bg-blue-400',
    pending: 'bg-blue-400',
    processing: 'bg-amber-400',
    committed: 'bg-orange-500',
    submitted: 'bg-orange-500',
    onboarding: 'bg-amber-400',
    signed: 'bg-amber-400',
    active: 'bg-primary-500',
    complete: 'bg-primary-500',
    completed: 'bg-primary-500',
    fund_manager: 'bg-primary-500',
    success: 'bg-primary-500',
    null: 'bg-zinc-400',
    wired: 'bg-primary-500',
    crypto: 'bg-primary-500'
  };
  return (
    <div
      className={`inline text-white capitalize rounded-full ${
        small ? 'px-2 py-1 text-sm' : 'px-2 py-1 md:px-3 md:py-1'
      } text-sm md:text-sm items-center ${
        status && colors[status.toLowerCase()]
          ? colors[status.toLowerCase()]
          : null
      }`}
    >
      {status?.replace('_', ' ')}
    </div>
  );
}
