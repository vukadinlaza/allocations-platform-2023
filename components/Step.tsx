import Image from 'next/image';

export default function Step({
  selected = false,
  disabled = false,
  component
}: {
  selected?: any;
  disabled?: boolean;
  component?: any;
}) {
  return (
    <div
      className={`md:flex items-start w-full p-5 md:px-5 md:py-6 border-b border-l-4 ${
        selected ? ' border-l-primary-400' : ''
      } ${disabled ? 'disabled' : ''}`}
    >
      <div className="hidden w-6 mb-2 md:w-10 md:mr-2 md:flex">
        <Image
          src={selected ? '/checked_rounded.svg' : '/checked_rounded_empty.svg'}
          alt="checked"
          className={`${selected ? '' : 'opacity-25'} `}
          width={32}
          height={32}
        />
      </div>
      {component}
    </div>
  );
}
