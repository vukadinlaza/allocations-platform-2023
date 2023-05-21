import numeral from 'numeral';
import Price from '../Price';

interface ItemProps {
  title?: string;
  value?: any;
  unit?: string;
  type?: string;
}

export default function DataCard({ item }: { item: ItemProps }) {
  return (
    <div className="rounded-lg">
      <p className="mb-2 text-xl font-medium">{item.title}</p>
      <div className="flex items-center gap-2">
        {item.unit && <span className="text-xl">{item.unit}</span>}
        {item.value && (
          <div className="text-3xl font-bold">
            {item.type === 'number' && (
              <span className="text-3xl font-bold">
                {numeral(item.value).format('0,0')}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
