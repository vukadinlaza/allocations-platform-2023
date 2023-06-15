'use client';

import Alert from '@/components/Alert';
import DateComponent from '@/components/DateComponent';

export default function OrganizationHeader({
  organization,
  button,
  isAdmin = false
}: {
  organization: any;
  button?: any;
  isAdmin?: boolean;
}) {
  return (
    <header className="flex items-center justify-start mb-8">
      <div className="items-center justify-center hidden w-16 h-16 mt-1 mr-4 text-white rounded md:flex bg-primary-500">
        {!organization.name && <h1 className="mb-0 text-3xl">O</h1>}
        {organization.name && (
          <h1 className="mb-0 text-xl md:text-3xl">{organization.name[0]}</h1>
        )}
      </div>
      <div className="flex flex-col items-start justify-center gap-1 grow">
        <div className="flex gap-2">
          {organization.name && (
            <h1 className="mb-0 text-xl md:text-3xl">{organization.name}</h1>
          )}
        </div>
        <div className="flex gap-2">
          <label className="mb-0">
            Creation date: <DateComponent date={organization.created_at} />.
          </label>
        </div>
      </div>
      {button && (
        <div className="flex flex-col items-end gap-2">
          {button}
          {isAdmin && (
            <Alert
              close={false}
              color="text-primary-800 bg-primary-50"
              content={
                <div className="flex gap-2 font-bold">
                  You are administrator.
                </div>
              }
            />
          )}
        </div>
      )}
    </header>
  );
}
