import { SpaceDashboardOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton } from '@mui/material';
import { openURL } from '../Table';

export default function Beta({ showBetaAlert }: { showBetaAlert: any }) {
  return (
    <Alert
      className="border border-primary-300"
      icon={<SpaceDashboardOutlined className=" text-primary" />}
      severity="success"
      sx={{ marginBottom: '12px' }}
      action={
        <IconButton
          aria-label="showBetaAlert"
          color="primary"
          size="small"
          onClick={() => showBetaAlert(false)}
        >
          <CloseIcon fontSize="inherit" className="text-primary" />
        </IconButton>
      }
    >
      <h2 className="mt-0">New platform</h2>
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
