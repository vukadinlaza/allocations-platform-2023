import { SpaceDashboardOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton } from '@mui/material';

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
        Welcome to our new fund administration platform built for scalability.
      </span>
    </Alert>
  );
}
