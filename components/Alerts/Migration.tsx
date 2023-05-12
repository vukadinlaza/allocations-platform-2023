import {
  Close,
  WarningAmberOutlined
} from '@mui/icons-material';
import { Alert, IconButton } from '@mui/material';

export default function Migration({ showBetaAlert }: { showBetaAlert: any }) {
  return (
    <Alert
      className="mb-6 border border-amber-300"
      icon={<WarningAmberOutlined fontSize="inherit" className="text-amber" />}
      severity="warning"
      action={
        <IconButton
          aria-label="showBetaAlert"
          color="warning"
          size="small"
          onClick={() => showBetaAlert(false)}
        >
          <Close fontSize="inherit" className="text-amber" />
        </IconButton>
      }
    >
      <h2 className="mt-0">Migration in progress</h2>
      <span>
        We are in the process of migrating your data to the new platform over
        the next 30 days. We appreciate your patience.
      </span>
    </Alert>
  );
}
