import Select from '@/components/Select';
import { investment_identity_types } from '@/types/values';
import { useState } from 'react';
import NewCompany from './Company';

export default function NewUserInvestmentEntityIdentity({
  onUpdate,
  hideHeader = false,
  identities = []
}: {
  hideHeader?: boolean;
  identities?: any[];
  onUpdate: () => any;
}) {
  const [type, setType] = useState<string>('Myself / Individual');

  return (
    <div className="w-full p-4 my-8 bg-white border rounded">
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
      {type === 'Myself / Individual' ||
        type === 'LLC' ||
        (type === 'Corporation' && (
          <NewCompany type={type} onUpdate={() => {}} />
        ))}
      {/* {type === 'Myself / Individual' && <NewIndividual onUpdate={onUpdate} />}
      {type === 'LLC' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Corporation' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Partnership' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Trust' && <NewTrust onUpdate={onUpdate} />}
      {type === 'Self-directed IRA' && <NewIRA onUpdate={onUpdate} />} */}
    </div>
  );
}
