import NewCompany from '@/components/Investments/Module/Entity/Company';
import Select from '@/components/Select';
import { useState } from 'react';
import NewIndividual from './Individual';

export default function NewUserInvestmentsEntity({
  onUpdate
}: {
  onUpdate: () => any;
}) {
  const [type, setType] = useState<any>('Myself/Individual');
  const items = [
    'Myself/Individual',
    'LLC',
    'Corporation',
    'Partnership',
    'Trust',
    'Self-directed IRA'
  ];

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 gap-4 pb-4">
        <h2>Create a new investment entity</h2>
        <p>Type of entity:</p>
        <Select
          items={items}
          selected={type}
          onChange={(type: string) => setType(type)}
        />
      </div>
      {type === 'Myself/Individual' && <NewIndividual onUpdate={onUpdate} />}
      {type === 'LLC' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Corporation' && <NewCompany type={type} onUpdate={onUpdate} />}
      {type === 'Partnership' && <NewCompany type={type} onUpdate={onUpdate} />}
    </div>
  );
}
