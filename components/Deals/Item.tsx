import { getFirstLetter } from '@/lib/utils';

export default function DealItem({ deal }: { deal: any }) {
  return (
    <div className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
      <div className="items-center justify-center hidden w-8 h-8 mr-4 text-lg text-white rounded md:flex bg-primary-400">
        {getFirstLetter(deal.name)}
      </div>
      <div className="flex flex-col grow">{deal.name}</div>
    </div>
  );
}
