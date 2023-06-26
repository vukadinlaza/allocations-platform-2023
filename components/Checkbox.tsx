import Image from 'next/image';

const Checkbox = ({
  onChange,
  label,
  selected,
  disabled
}: {
  onChange?: (v: any) => any;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`flex items-start my-2 cursor-pointer ${
        disabled ? 'disabled' : ''
      }`}
      onClick={onChange}
    >
      <Image
        src={
          !disabled && selected
            ? '/checkbox_checked.svg'
            : '/checkbox_empty.svg'
        }
        alt="checkbox"
        className={`mr-2 ${selected ? '' : 'opacity-50'} ${
          disabled ? 'disabled' : ''
        }`}
        width={20}
        height={20}
      />
      {label && <label className="text-sm">{label}</label>}
    </div>
  );
};

export default Checkbox;
