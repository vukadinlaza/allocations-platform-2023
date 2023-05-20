import Button from '@/components/Button';

export default function AlertDealPage({
  onClick,
  edit
}: {
  edit: boolean;
  onClick: () => any;
}) {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 border rounded bg-primary-50 border-primary-500">
      <p className="mr-2">This is a view of the public page.</p>
      <Button
        loading={false}
        disabled={false}
        label={edit ? 'Back to view' : 'Edit page'}
        onClick={onClick}
      />
    </div>
  );
}
