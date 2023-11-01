import { FC, ReactNode } from 'react';

type IProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const ButtonIcon: FC<IProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className="p-2 bg-transparent text-muted dark:text-white hover:text-secondary hover:bg-secondary/30 dark:hover:bg-white/30 transition-all"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
