import { FC, ReactNode } from 'react';

const Button: FC<{ children: ReactNode, onClick?: () => void }> = ({ children, onClick, ...props }) => {
  return (
    <button
      className="block rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
