import Checkbox from '@/components/Checkbox';
import { getFirstLetter } from '@/lib/utils';
import { UserInvestmentEntity } from '@/types';
import { Alert, Avatar } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import NewUserInvestmentsEntity from './Entity/New';

export default function InvestmentEntity({
  entities = [],
  onChange,
  selected,
  onUpdate
}: {
  entities: UserInvestmentEntity[];
  onChange: (v: any) => any;
  onUpdate: () => any;
  selected: any;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-lg font-bold">Who is investing?</h2>
        <p className="text-sm">You have no identity yet.</p>
      </header>
      <main>
        <div>
          {entities && (
            <div>
              <Alert severity="info" className="mb-4">
                We are asking all investors to verify all their data by
                submitting it again even if they provided on previous
                investments.
              </Alert>
              {entities.map((entity: UserInvestmentEntity, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 mb-4 border rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => onChange(entity)}
                >
                  <Avatar
                    className="mr-2 cursor-pointer"
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#3db278',
                      textTransform: 'capitalize'
                    }}
                  >
                    {getFirstLetter(entity.name)}
                  </Avatar>
                  <div className="flex flex-col grow">
                    {entity.name && <span className="mb-0">{entity.name}</span>}
                    {entity.type && (
                      <span className="text-xs text-gray-600">
                        {entity.type}
                      </span>
                    )}
                  </div>
                  <Checkbox selected={selected === entity.id} />
                </div>
              ))}
            </div>
          )}
        </div>
        {show && <NewUserInvestmentsEntity onUpdate={onUpdate} />}
        <button className="text info" onClick={() => setShow(true)}>
          <Image
            src={'/plus.svg'}
            alt="plus"
            className="mr-2 text-primary-500"
            width={18}
            height={18}
          />
          <span>New investment entity</span>
        </button>
      </main>
    </div>
  );
}
