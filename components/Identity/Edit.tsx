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
      {identity.kyc_status === 'failed' && identity.kyc_status === 'error' && (
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
      {identity.kyc_status === 'pending' && (
        <Alert
          close={false}
          color="bg-sky-100 text-sky-600 mb-4"
          content={
            <span className="text-sm font-medium">
              This identity is currently being verified. You will be notified of
              the status change soon. We appreciate your patience.
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
        editable={true}
        entityType={identity.type}
        identity={identity}
        onUpdate={() => onUpdate()}
      />
    </div>
  );
}
