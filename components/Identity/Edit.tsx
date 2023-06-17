'use client';
import DateComponent from '@/components/DateComponent';
import Alert from '../Alert';
import NewCompany from './Company';
export default function EditIdentity({
  identity,
  onUpdate
}: {
  identity: any;
  onUpdate: () => void;
}) {
  return (
    <div className="EditCompany">
      {identity.kyc_status !== 'success' && (
        <Alert
          close={false}
          color="bg-red-100 text-red-600 mb-4"
          content={
            <span className="text-sm font-medium">
              Sorry, this identity check has failed. Please try again.
            </span>
          }
        />
      )}
      <div className="mb-8">
        <h2 className="text-xl">{identity.legal_name}</h2>
        <div className="flex flex-col">
          <label>
            Submitted at: <DateComponent date={identity.created_at} />
          </label>
          <label htmlFor="">Type: {identity.type}</label>
        </div>
      </div>
      <NewCompany
        entityType={identity.type}
        identity={identity}
        onUpdate={() => onUpdate()}
      />
    </div>
  );
}
