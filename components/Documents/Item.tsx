import Image from 'next/image';

export default function DocumentsItem({
  item,
  button
}: {
  item: any;
  button?: any;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-3 border rounded-lg bg-gray-50 file">
      <div className="flex items-center">
        <Image
          src="/attach.svg"
          alt="Add File"
          className="cursor-pointer text-primary"
          width={24}
          height={24}
        />
        {item.name && <p className="text-xs">{item.name}</p>}
      </div>
      {button}
    </div>
  );
}
