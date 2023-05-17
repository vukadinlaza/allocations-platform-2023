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
      <p className="mb-2 text-sm font-medium">{item.title}</p>
      <div className="flex items-center gap-2">
        {item.unit && <span className="text-sm">{item.unit}</span>}
        {item.value && (
          <span className="text-3xl font-bold">
            {item.type === 'price' && <Price price={item.value} />}
            {item.type === 'number' && numeral(item.value).format('0,0')}
          </span>
        )}
      </div>
    </div>
  );
}
