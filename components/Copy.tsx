import { useAuthContext } from '@/app/context';
import Image from 'next/image';

export default function CopyToClipboard({ toCopy }: { toCopy: string }) {
  const { notify } = useAuthContext();

  async function copyFunction(str: string) {
    try {
      await navigator.clipboard.writeText(str);
      notify('Copied to clipboard!', true);
      return;
    } catch (error) {
      notify('Sorry, impossible to copy.', false);
      return;
    }
  }

  return (
    <div className="p-2 cursor-pointer" onClick={() => copyFunction(toCopy)}>
      <Image
        src={'./copy.svg'}
        alt="copy"
        className="opacity-50"
        width={24}
        height={24}
      />
    </div>
  );
}
