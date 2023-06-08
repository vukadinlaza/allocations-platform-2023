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
      className={`md:flex items-start w-full p-3 md:px-5 md:py-6 border-b border-l-4 ${
        selected ? ' border-l-primary-400' : ''
      } ${disabled ? 'disabled' : ''}`}
    >
      <div className="w-10 mb-2 md:mr-2">
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
