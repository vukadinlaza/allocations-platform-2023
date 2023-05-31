import Image from 'next/image';

export default function Step({
  selected = false,
  component
}: {
  selected?: any;
  component?: any;
}) {
  return (
    <div
      className={`flex items-start w-full px-5 py-6 border-b border-l-4 ${
        selected ? ' border-l-primary-400' : ''
      }`}
    >
      <div className="w-10 mr-2">
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
