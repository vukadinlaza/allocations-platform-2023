import {
  Close,
  WarningAmberOutlined
} from '@mui/icons-material';
import { Alert, IconButton } from '@mui/material';

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
      <h2 className="mt-0">Scheduled Migration</h2>
      <span>
        We are in the process of migrating your data to the new platform over
        the next 30 days. We appreciate your patience.
      </span>
    </Alert>
  );
}
