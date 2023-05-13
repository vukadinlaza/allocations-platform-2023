import Image from 'next/image';
import { useState } from 'react';

const Checkbox = ({
  onChange,
  label,
  value
}: {
  onChange: (v: any) => any;
  label: string;
  value: boolean;
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
        src={checked ? '/checkbox_checked.svg' : '/checkbox_empty.svg'}
        alt="checkbox"
        className={`mt-1 mr-2 ${checked ? '' : 'opacity-50'}`}
        width={20}
        height={20}
      />
      <p className="leading-1">{label}</p>
    </div>
  );
};

export default Checkbox;
