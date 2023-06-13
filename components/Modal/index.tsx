import Close from '@mui/icons-material/Close';
import Card from '@mui/material/Card';

export default function ModalBox({
  title,
  content,
  onClose
}: {
  title?: string;
  content?: any;
  onClose?: () => void;
}) {
  return (
    <Card className="mb-0 overflow-auto card--popup" variant="outlined">
      <header className="sticky">
        <h2>{title}</h2>
        <Close
          fontSize="inherit"
          className="text-2xl cursor-pointer text-gray"
          onClick={() => {
            if (onClose) onClose();
          }}
        />
      </header>
      <div className="p-6">{content}</div>
    </Card>
  );
}
