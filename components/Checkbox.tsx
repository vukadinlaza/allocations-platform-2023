import Image from 'next/image';
import { useState } from 'react';

const Checkbox = ({
  onChange,
  label,
  selected
}: {
  onChange?: (v: any) => any;
  label?: string;
  selected: boolean;
}) => {

  return (
    <div
      className="flex items-start my-3 cursor-pointer"
      onClick={onChange}
    >
      <Image
        src={selected ? '/checkbox_checked.svg' : '/checkbox_empty.svg'}
        alt="checkbox"
        className={`mr-2 ${selected ? '' : 'opacity-50'}`}
        width={20}
        height={20}
      />
      {label && <p className="leading-1">{label}</p>}
    </div>
  );
};

export default Checkbox;
