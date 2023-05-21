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
      className={`flex items-start w-full p-6 mb-6 border rounded ${
        selected ? 'border-primary-500 ' : ''
      }`}
    >
      <div className="mr-4">
        <Image
          src={selected ? '/checked_rounded.svg' : '/checked_rounded_empty.svg'}
          alt="checked"
          className={selected ? '' : 'opacity-25'}
          width={32}
          height={32}
        />
      </div>
      {component}
    </div>
  );
}
