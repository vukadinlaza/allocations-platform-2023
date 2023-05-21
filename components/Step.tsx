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
      className={`flex items-start w-full pt-5 pb-6 pl-4 pr-5 mb-6 border border-l-8 rounded-lg ${
        selected ? ' border-l-primary-400 border-primary-400' : ''
      }`}
    >
      <div className="w-10">
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
