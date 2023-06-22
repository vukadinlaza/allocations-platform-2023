export default function ChipStatus({
  status,
  selected = false,
  toSelect = false,
  small = false
}: {
  status: string;
  selected?: boolean;
  toSelect?: boolean;
  small?: boolean;
}) {
  const colors: any = {
    active: 'bg-primary-500',
    admin: 'bg-amber-400',
    archived: 'bg-gray-600',
    closing: 'bg-primary-500',
    closed: 'bg-primary-500',
    complete: 'bg-primary-500',
    completed: 'bg-primary-500',
    committed: 'bg-orange-500',
    crypto: 'bg-primary-500',
    draft: 'bg-gray-300',
    extension_filed: 'bg-orange-500',
    filed_extension: 'bg-orange-500',
    cancelled: 'bg-red-500',
    failed: 'bg-red-500',
    fund_manager: 'bg-primary-500',
    invited: 'bg-blue-400',
    missing_data: 'bg-amber-500',
    null: 'bg-zinc-400',
    no_color: 'bg-gray-300',
    onboarding: 'bg-amber-400',
    pending: 'bg-blue-400',
    queued: 'bg-blue-400',
    processing: 'bg-amber-400',
    rejected: 'bg-red-500',
    signed: 'bg-amber-400',
    submitted: 'bg-orange-500',
    success: 'bg-primary-500',
    wired: 'bg-primary-500'
  };

  const replaceStatus = (status: string) => {
    if (!status) return;
    if (status === 'created_at') return 'By date';
    if (status === 'total_raised_amount') return 'By total raised amount';
    return status;
  };

  return (
    <div
      className={`inline text-white rounded-full ${
        small ? 'px-2 py-1 text-sm' : 'px-2 py-1 md:px-3 md:py-1'
      } text-sm md:text-sm items-center ${
        status && !toSelect && colors[status.replace(' ', '_').toLowerCase()]
          ? colors[status.replace(' ', '_').toLowerCase()]
          : selected
          ? 'bg-primary-500'
          : colors.no_color
      } capitalize`}
    >
      {status && <>{replaceStatus(status).replace('_', ' ')}</>}
    </div>
  );
}
