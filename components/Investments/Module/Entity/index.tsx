import Button from '@/components/Button';
import { IdentityList } from '@/components/Identity/List';
import { useSupabase } from '@/lib/supabase-provider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NewUserInvestmentsEntity from '../../../Identity/New';

export default function InvestmentEntity({
  onChange,
  selected,
  onUpdate,
  validate = true
}: {
  onChange: (v: any) => any;
  onUpdate: () => any;
  selected: any;
  validate?: boolean;
}) {
  const [identities, setIdentities] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>(undefined);
  const { supabase } = useSupabase();

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
        <div className="mb-4">
          <IdentityList
            details={false}
            selectedId={selectedId}
            onSelect={(id: string) => {
              setSelectedId(id);
            }}
          />
        </div>
        {show && (
          <div className="pt-6 mt-6 border-t">
            <NewUserInvestmentsEntity
              onClose={() => setShow(false)}
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
