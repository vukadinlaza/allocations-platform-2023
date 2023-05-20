import Button from '@/components/Button';

export default function EditDealPage({
  onClick,
  edit
}: {
  edit: boolean;
  onClick: () => any;
}) {
  return (
    <div className="flex items-center justify-center px-4 py-3 border rounded bg-primary-50 border-primary-500">
      <p className="mr-2">Page investors will see.</p>
      <Button
        loading={false}
        disabled={false}
        label={edit ? 'Back to page' : 'Edit my deal'}
        onClick={onClick}
      />
    </div>
  );
}
