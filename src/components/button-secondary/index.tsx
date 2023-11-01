import { FC, ReactNode } from 'react';

type IProps = {
  children: ReactNode;
  onClick?: () => void;
};

const ButtonSecondary: FC<IProps> = ({ children, onClick }) => {
  return (
    <button
      className="flex flex-row items-center space-x-2 bg-transparent hover:bg-[#f9f9f9] dark:hover:bg-black/20 transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
