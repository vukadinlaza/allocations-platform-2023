import NewCompany from '@/components/Investments/Module/Entity/Company';
import Select from '@/components/Select';
import { users_investiment_entities_types } from '@/types/values';
import { useState } from 'react';
import NewIRA from './IRA';
import NewIndividual from './Individual';
import NewTrust from './Trust';

export default function NewUserInvestmentEntity({
  onUpdate
}: {
  onUpdate: () => any;
}) {
  const [type, setType] = useState<string>('Myself/Individual');

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 gap-4 pb-4">
        <h2>Create a new investment entity</h2>
        <p>Type of entity:</p>
        <Select
          items={users_investiment_entities_types}
          selected={type}
          onChange={(type: string) => setType(type)}
        />
      </div>
      {type === 'Myself/Individual' && <NewIndividual onUpdate={onUpdate} />}
      {type === 'LLC' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Corporation' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Partnership' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Trust' && <NewTrust onUpdate={onUpdate} />}
      {type === 'Self-directed IRA' && <NewIRA onUpdate={onUpdate} />}
    </div>
  );
}
