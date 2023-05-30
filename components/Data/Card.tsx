import numeral from 'numeral';
import Price from '../Price';

interface ItemProps {
  title?: string;
  value?: any;
  unit?: string;
  type?: string;
  format?: string;
}

export default function DataCard({ item }: { item: ItemProps }) {
  return (
    <div className="px-8 py-4 text-left bg-white border rounded-lg card">
      <p className="mb-2 text-sm font-medium">{item.title}</p>
      <div className="flex items-center gap-2">
        {item.value > 0 && (
          <div className="text-3xl font-medium">
            {item.type === 'number' && (
              <span className="text-3xl font-medium">
                {numeral(item.value).format(item.format || '0,0')}
              </span>
            )}
            {item.type === 'price' && <Price price={item.value} />}
          </div>
        )}
        {!item.value && <div className="text-3xl font-medium">-</div>}
        {item.unit && <span className="text-xl">{item.unit}</span>}
      </div>
    </div>
  );
}
