import Button from '@/components/Button';
import NewIdentity from '@/components/Identity';

export default function NewIdentityForm({
  onUpdate,
  hideHeader = false,
  onClose
}: {
  hideHeader?: boolean;
  onUpdate: () => any;
  onClose?: () => any;
}) {
  return (
    <div className="w-full mb-4">
      <div className="grid grid-cols-1 gap-4">
        {!hideHeader && (
          <header>
            <h2 className="text-lg font-bold">
              Create a new investment identity
            </h2>
          </header>
        )}
      </div>
      <NewIdentity onUpdate={onUpdate} />
      <div>
        {onClose && (
          <Button color="info" label={'Cancel'} onClick={() => onClose()} />
        )}
      </div>
    </div>
  );
}
