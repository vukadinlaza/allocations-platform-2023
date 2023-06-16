import Button from '@/components/Button';
import IdentityItem from '@/components/Identity/Item';
import { Identity } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NewUserInvestmentsEntity from '../../../Identity/New';

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
    if (show === true) {
      onChange(null);
    }
  }, [show]);

  useEffect(() => {
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
            <div className="grid gap-2 mb-8">
              {identities.map((identity: Identity) => (
                <IdentityItem
                  selectedId={selectedId}
                  key={'identity-' + identity.id}
                  identity={identity}
                  onChange={(id: string) => {
                    setSelectedId(id);
                  }}
                />
              ))}
            </div>
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
            label={'New investment identity'}
            onClick={() => setShow(true)}
          />
        )}
      </main>
    </div>
  );
}
