import Button from '@/components/Button';
import IdentityItem from '@/components/Identity/Item';
import { Identity } from '@/types';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NewUserInvestmentsEntity from './New';

export default function InvestmentEntity({
  identities = [],
  onChange,
  selected,
  onUpdate,
  validate = true
}: {
  identities: Identity[];
  onChange: (v: any) => any;
  onUpdate: () => any;
  selected: any;
  validate?: boolean;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>(undefined);

  useEffect(() => {
    console.log(selectedId);
    if (show === true) {
      onChange(null);
    }
  }, [show]);

  useEffect(() => {
    console.log(selectedId);
    onChange(selectedId);
  }, [selectedId]);

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-lg font-bold">Select an identity</h2>
      </header>
      <main>
        <div>
          {identities && (
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {identities.map((identity: Identity, index: number) => (
                <IdentityItem
                  selectedId={selectedId}
                  key={'identity-'+identity.id}
                  identity={identity}
                  onChange={(id: string) => {
                    setSelectedId(id);
                  }}
                />
              ))}
            </Box>
          )}
        </div>
        {show && (
          <div className="pt-6 mt-6 border-t">
            <NewUserInvestmentsEntity
              onClose={() => setShow(false)}
              identities={identities}
              onUpdate={onUpdate}
            />
          </div>
        )}
        {!show && (
          <Button
            color="info"
            icon={
              <Image
                src={'/plus.svg'}
                alt="plus"
                className="opacity-50 "
                width={18}
                height={18}
              />
            }
            label={'New investment entity'}
            onClick={() => setShow(true)}
          />
        )}
      </main>
    </div>
  );
}
