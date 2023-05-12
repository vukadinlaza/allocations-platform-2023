import { CircularProgress } from '@material-ui/core';
import { FunctionComponent } from 'react';

interface ButtonProps {
  onClick: () => void;
  loading: boolean;
  label: string;
  disabled?: boolean;
  color?: string;
  icon?: any;
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  loading,
  label,
  disabled,
  color,
  icon
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn mr-0 ${color ? color : 'primary'} ${
        loading ? 'loading' : ''
      } ${disabled ? 'disabled' : ''}`}
      disabled={disabled || loading}
    >
      {loading && <CircularProgress color="inherit" size={12} />}
      {!loading && (
        <div className="flex items-center justify-center">
          {icon && <span className="mr-1">{icon}</span>}
          {label}
        </div>
      )}
    </button>
  );
};

export default Button;
