import Alert from '@mui/material/Alert';
import { openURL } from '../Table';

export default function Migration() {
  return (
    <>
      <Alert
        className="mb-6 border border-amber-400"
        severity="warning"
        icon={null}
      >
        <h2 className="mt-0">
          New platform migration update — last update: 06/06 at 06:50 EST
        </h2>
        <span>
          Welcome to the new platform! We are in the process of migrating your
          data to this new platform over the next 30 days. Please email
          support@allocations.com for urgent support requests. We appreciate
          your patience. The legacy platform is available here (view only mode
          with data as of 20 May 2023):{' '}
          <span
            className="underline cursor-pointer"
            onClick={() => openURL('https://legacy.allocations.com', '_blank')}
          >
            https://legacy.allocations.com
          </span>
        </span>
      </Alert>
    </>
  );
}
