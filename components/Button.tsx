import { CircularProgress } from '@material-ui/core';
import { FunctionComponent } from 'react';

interface ButtonProps {
  onClick: () => void;
  loading: boolean;
  label: string;
  disabled?: boolean;
  color?: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  loading,
  label,
  disabled,
  color
}) => {
  return (
    <button
      onClick={onClick}
      className={`mt-4 btn ${color ? color : 'primary'} ${
        loading ? 'loading' : ''
      } ${disabled ? 'disabled' : ''}`}
      disabled={disabled || loading}
    >
      {loading && <CircularProgress color="inherit" size={12} />}
      {!loading && label}
    </button>
  );
};

export default Button;
