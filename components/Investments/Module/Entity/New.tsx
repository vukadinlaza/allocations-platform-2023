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
  onClose: () => any;
}) {
  const [type, setType] = useState<string>('Myself / Individual');

  return (
    <div className="w-full p-4 my-8 bg-white border">
      <div className="grid grid-cols-1 gap-4 pb-4">
        {!hideHeader && (
          <header>
            <h2>Create a new investment identity</h2>
            <p>Type of identity:</p>
          </header>
        )}
        <Select
          items={investment_identity_types.filter((i) =>
            identities.length === 0 ? i === 'Myself / Individual' : i
          )}
          selected={type}
          onChange={(type: string) => setType(type)}
        />
      </div>
      {type === 'Myself / Individual' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'LLC' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Corporation' && <NewCompany type={type} onUpdate={onUpdate} />}
      {/* {type === 'Partnership' && <NewCompany type={type} onUpdate={onUpdate} />}
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
