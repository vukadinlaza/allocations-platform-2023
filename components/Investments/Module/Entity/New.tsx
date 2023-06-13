import Button from '@/components/Button';
import Select from '@/components/Select';
import { investment_identity_types } from '@/types/values';
import { useState } from 'react';
import NewCompany from './Company';

export default function NewUserInvestmentEntityIdentity({
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
              Create a new investment entity
            </h2>
          </header>
        )}
        <label>Type of identity:</label>
        <Select
          items={investment_identity_types.filter((i) =>
            identities.length === 0 ? i === 'Myself / Individual' : i
          )}
          selected={type}
          onChange={(type: string) => setType(type)}
        />
      </div>
      <div className="py-3 rounded-lg">
        {type === 'Myself / Individual' && (
          <NewCompany type={type} onUpdate={onUpdate} />
        )}
        {type === 'LLC' && <NewCompany type={type} onUpdate={onUpdate} />}
        {type === 'Corporation' && (
          <NewCompany type={type} onUpdate={onUpdate} />
        )}
      </div>
      {/* {type === 'Myself / Individual' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'LLC' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Corporation' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Partnership' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Trust' && <NewTrust onUpdate={onUpdate} />}
      {type === 'Self-directed IRA' && <NewIRA onUpdate={onUpdate} />} */}
      <div>
        {onClose && (
          <Button color="info" label={'Cancel'} onClick={() => onClose()} />
        )}
      </div>
    </div>
  );
}
