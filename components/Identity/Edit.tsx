'use client';
import NewCompany from './Company';
export default function EditIdentity({ identity }: { identity: any }) {
  return (
    <div className="EditCompany">
      <NewCompany
        type={identity.type}
        identity={identity}
        onUpdate={() => {}}
      />
    </div>
  );
}
