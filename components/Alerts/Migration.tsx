import { Close, WarningAmberOutlined } from '@mui/icons-material';
import { Alert, IconButton } from '@mui/material';
import { openURL } from '../Table';

export default function Migration({ showBetaAlert }: { showBetaAlert: any }) {
  return (
    <Alert
      className="mb-6 border border-primary-400"
      icon={<WarningAmberOutlined fontSize="inherit" className="text-amber" />}
      severity="success"
      action={
        <IconButton
          aria-label="showBetaAlert"
          color="success"
          size="small"
          onClick={() => showBetaAlert(false)}
        >
          <Close fontSize="inherit" className="text-primary-500" />
        </IconButton>
      }
    >
      <h2 className="mt-0">
        New platform migration update — last update: today at 08:15 EST
      </h2>
      <span>
        Welcome to the new platform! Core features will be released between the
        dates of 22 May 2023 and 26 May 2023. Please email
        support@allocations.com for urgent support requests. We appreciate your
        patience. The legacy platform is available here (view only mode with
        data until 20 May 2023):{' '}
        <span
          className="underline"
          onClick={() => openURL('https://legacy.allocations.com')}
        >
          https://legacy.allocations.com
        </span>
      </span>
    </Alert>
  );
}
