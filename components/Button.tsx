import { CircularProgress } from '@material-ui/core';
import { FunctionComponent } from 'react';

interface ButtonProps {
  onClick: () => void;
  loading?: boolean;
  label: any;
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
      } ${disabled ? 'disabled' : ''} ${small ? 'small' : ''}`}
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
          } text-sm md:text-base`}
        >
          {icon && (
            <div className="mr-2" style={{ minWidth: 18 }}>
              {icon}
            </div>
          )}
          <span className="whitespace-nowrap">{label}</span>
        </div>
      )}
    </button>
  );
};

export default Button;
