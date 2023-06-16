import Button from '@/components/Button';
import Select from '@/components/Select';
import { investment_identity_types } from '@/types/values';
import { useState } from 'react';
import NewCompany from '@/components/Identity/Company';

export default function NewIdentity({
  onUpdate,
  hideHeader = false,
  identities = [],
  onClose
}: {
  hideHeader?: boolean;
  identities?: any[];
  onUpdate: () => any;
  onClose?: () => any;
}) {
  const [type, setType] = useState<string>('Myself / Individual');

  return (
    <div className="w-full mb-4">
      <div className="grid grid-cols-1 gap-4 pb-4">
        {!hideHeader && (
          <header>
            <h2 className="text-lg font-bold">
              Create a new investment identity
            </h2>
          </header>
        )}
        <label>Type of identity</label>
        <Select
          items={investment_identity_types.filter((i) =>
            identities.length === 0 ? i === 'Myself / Individual' : i
          )}
          selected={type}
          onChange={(type: string) => setType(type)}
        />
      </div>
      <NewCompany type={type} onUpdate={onUpdate} />
      <div>
        {onClose && (
          <Button color="info" label={'Cancel'} onClick={() => onClose()} />
        )}
      </div>
    </div>
  );
}
