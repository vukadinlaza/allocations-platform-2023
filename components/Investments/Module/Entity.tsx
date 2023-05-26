import Checkbox from '@/components/Checkbox';
import { getFirstLetter } from '@/lib/utils';
import { Identity } from '@/types';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import { useState } from 'react';
import NewUserInvestmentsEntity from './Entity/New';

export default function InvestmentEntity({
  identities = [],
  onChange,
  selected,
  onUpdate
}: {
  identities: Identity[];
  onChange: (v: any) => any;
  onUpdate: () => any;
  selected: any;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <header className="mb-6">
        <Alert severity="info" className="mb-4">
          We are asking all investors to verify their identity again
          even if provided on previous investments.
        </Alert>
        <h2 className="text-lg font-bold">Who is investing?</h2>
      </header>
      <main>
        <div>
          {identities && (
            <div>
              {identities.map((identity: Identity, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 mb-4 border rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => onChange(identity)}
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
                    {getFirstLetter(identity.legal_name)}
                  </Avatar>
                  <div className="flex flex-col grow">
                    {identity.legal_name && <span className="mb-0">{identity.legal_name}</span>}
                    {identity.type === 'Individual' && (
                      <span className="text-xs text-gray-600">
                        A {identity.country} {identity.type}
                      </span>
                    )}
                    {identity.entity_type && (
                      <span className="text-xs text-gray-600">
                        A {identity.country} {identity.entity_type} Entity
                      </span>
                    )}
                  </div>
                  <Checkbox selected={selected === identity.id} />
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
