import Image from 'next/image';
import { useEffect, useState } from 'react';

const RadioGroup = ({
  selected,
  options,
  onChange
}: {
  selected?: string;
  options: any;
  onChange: any;
}) => {
  const [selectedOption, setSelectedOption] = useState<any>(null);

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption]);

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  return (
    <div>
      {options.map((option: any) => (
        <div
          key={option.value}
          className="flex items-start my-4 cursor-pointer"
          onClick={() => setSelectedOption(option.value)}
        >
          <Image
            src={
              selectedOption === option.value
                ? '/radio_checked.svg'
                : '/empty_radio.svg'
            }
            alt="radio"
            className={`mt-1 mr-2 ${
              selectedOption === option.value ? '' : 'opacity-50'
            }`}
            width={20}
            height={20}
          />
          <p className="leading-1">{option.label}</p>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
