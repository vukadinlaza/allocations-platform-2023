'use client';
import DateComponent from '@/components/DateComponent';
import Alert from '../Alert';
import NewCompany from './Company';
import { checkStatus } from './Item';

export default function EditIdentity({
  identity,
  onUpdate
}: {
  identity: any;
  onUpdate: () => void;
}) {
  return (
    <div className="EditCompany">
      {checkStatus(identity) === 'pending' && (
        <Alert
          close={false}
          color="bg-sky-100 text-sky-600 mb-4"
          content={
            <span className="text-sm font-medium">
              We are currently verifying your identity. Thank you for your
              patience.
            </span>
          }
        />
      )}
      {checkStatus(identity) === 'missing_data' && (
        <Alert
          close={false}
          color="bg-amber-100 text-amber-600 mb-4"
          content={
            <span className="text-sm font-medium">
              This identity is missing data. Please fill in the missing fields.
            </span>
          }
        />
      )}
      {checkStatus(identity) === 'failed' &&
        checkStatus(identity) === 'error' && (
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
      {checkStatus(identity) === 'queued' && (
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
            Creation date: <DateComponent date={identity.created_at} />
          </label>
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
