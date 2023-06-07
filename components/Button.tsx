import { CircularProgress } from '@material-ui/core';
import { FunctionComponent } from 'react';

interface ButtonProps {
  onClick: () => void;
  loading?: boolean;
  label: string;
  disabled?: boolean;
  small?: boolean;
  color?: string;
  icon?: any;
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  loading,
  label,
  disabled,
  color,
  icon,
  small
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn mr-0 ${color ? color : 'primary'} ${
        loading ? 'loading' : ''
      } ${disabled ? 'disabled' : ''}`}
      disabled={disabled || loading}
    >
      {loading && (
        <div className="p-1">
          <CircularProgress color="inherit" size={16} />
        </div>
      )}
      {!loading && (
        <div
          className={`flex items-center justify-center w-full text-center ${
            small ? 'text-sm' : 'text-base'
          }`}
        >
          {icon && (
            <div className="mr-1" style={{ minWidth: 18 }}>
              {icon}
            </div>
          )}
          {label}
        </div>
      )}
    </button>
  );
};

export default Button;
