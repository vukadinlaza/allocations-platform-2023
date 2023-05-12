import Image from 'next/image';
import { useState } from 'react';

const Checkbox = ({
  onChange,
  label,
  value
}: {
  onChange: (v: any) => any;
  label: string;
  value: string;
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
    onChange(value);
  };

  return (
    <div
      className="flex items-start my-4 cursor-pointer"
      onClick={handleChange}
    >
      <Image
        src={checked ? '/checked.svg' : '/empty.svg'}
        alt="checkbox"
        className="mr-2"
        width={20}
        height={20}
      />
      <p className="leading-1">{label}</p>
    </div>
  );
};

export default Checkbox;
