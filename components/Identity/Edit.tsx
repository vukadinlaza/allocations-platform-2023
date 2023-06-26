'use client';
import DateComponent from '@/components/DateComponent';
import NewIdentity from '.';

export default function EditIdentity({
  identity,
  onUpdate
}: {
  identity: any;
  onUpdate: () => void;
}) {
  return (
    <div className="EditCompany">
      <div className="mb-4">
        <h2 className="text-xl">{identity.legal_name}</h2>
        <div className="flex flex-col">
          <label>
            Creation date: <DateComponent date={identity.created_at} />
          </label>
        </div>
      </div>
      <NewIdentity identity={identity} onUpdate={() => onUpdate()} />
    </div>
  );
}
