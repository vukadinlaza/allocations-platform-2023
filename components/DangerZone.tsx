import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Button from './Button';
export default function DangerZone({
  toCheck,
  onClick
}: {
  toCheck: string | null | undefined;
  onClick: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    setDisabled(!(toCheck === name));
  }, [name]);
  return (
    <div className="p-4 mb-6 border border-red-200 rounded-lg danger-zone">
      <h2 className="mb-2 text-red-600">Danger zone</h2>
      <p className="mb-2">
        This action is irreversible and will permanently delete all the data
        associated with this element.
      </p>
      <TextField
        disabled={loading}
        size="small"
        variant="outlined"
        className="w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <Button
        loading={loading}
        disabled={disabled}
        label="Delete permanently"
        onClick={onClick}
        color="bg-red-600 text-white"
      />
    </div>
  );
}
