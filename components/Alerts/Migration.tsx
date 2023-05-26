import Close from '@mui/icons-material/Close';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { openURL } from '../Table';

export default function Migration({ showBetaAlert }: { showBetaAlert: any }) {
  return (<>
    <Alert
      className="mb-6 border border-amber-400"
      icon={<WarningAmberOutlined fontSize="inherit" className="text-amber" />}
      severity="warning"
      action={
        <IconButton
          aria-label="showBetaAlert"
          color="warning"
          size="small"
          onClick={() => showBetaAlert(false)}
        >
          <Close fontSize="inherit" className="text-amber-500" />
        </IconButton>
      }
    >
      <h2 className="mt-0">
        New platform migration update — last update: today at 09:45 EST
      </h2>
      <span>
        Welcome to the new platform! We are in the process of migrating your
        data to this new platform over the next 30 days. Please email
        support@allocations.com for urgent support requests. We appreciate your
        patience. The legacy platform is available here (view only mode with
        data as of 20 May 2023):{' '}
        <span
          className="underline cursor-pointer"
          onClick={() => openURL('https://legacy.allocations.com', '_blank')}
        >
          https://legacy.allocations.com
        </span>
      </span>
    </Alert>
    <Alert
      className="mb-6 border border-amber-400"
      icon={<WarningAmberOutlined fontSize="inherit" className="text-amber" />}
      severity="warning"
      action={
        <IconButton
          aria-label="showBetaAlert"
          color="warning"
          size="small"
          onClick={() => showBetaAlert(false)}
        >
          <Close fontSize="inherit" className="text-amber-500" />
        </IconButton>
      }
    >
      <h2 className="mt-0">
        Allocations Closed 29 May 2023
      </h2>
      <span>
          In observance of Memorial Day, Allocations will be closed Monday May 29th. We will resume normal operations on May 30th and appreciate your patience and understanding.
        </span>
    </Alert>
  </>);
}
