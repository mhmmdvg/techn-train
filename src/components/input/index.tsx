import { ChangeEvent, FC } from 'react';

type IProps = {
  placeholder: string;
  type: string;
  name?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<IProps> = ({ placeholder, type, onChange, name, disabled }) => {
  return (
    <input
      className="bg-[#fcfdfe] border-[#c7ccd1] border rounded-md w-full p-3 font-semibold text-xs text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      placeholder={placeholder}
      type={type}
      name={name}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default Input;
