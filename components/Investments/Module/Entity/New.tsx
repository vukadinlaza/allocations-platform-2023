import Button from '@/components/Button';
import NewCompany from '@/components/Investments/Module/Entity/Company';
import Select from '@/components/Select';
import { useEffect, useState } from 'react';

export default function NewUserInvestmentsEntity({
  saveNewEntity
}: {
  saveNewEntity: (v: any) => void;
}) {
  const [newEntity, setNewEntity] = useState<any>({
    type: 'LLC'
  });
  const [loading, setLoading] = useState<boolean>(false);
  const items = [
    'Myself/Individual',
    'LLC',
    'Corporation',
    'Partnership',
    'Trust',
    'Self-directed IRA'
  ];

  useEffect(() => {
    console.log(newEntity);
  }, [newEntity]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 pb-4 mb-4 border-b">
        <input
          type="text"
          placeholder="New entity name"
          onChange={(e) =>
            setNewEntity((prev: any) => ({ ...prev, name: e.target.value }))
          }
        />
        {/* <Select
          items={items}
          selected={newEntity.type}
          onChange={(type: string) =>
            setNewEntity((prev: any) => ({
              ...prev,
              type
            }))
          }
        /> */}
      </div>
      {/* {newEntity.type === 'LLC' && <NewCompany type={newEntity.type} />} */}
      <div>
        <Button
          loading={loading}
          label="Save investment entity"
          onClick={() => saveNewEntity(newEntity)}
        />
      </div>
    </div>
  );
}
