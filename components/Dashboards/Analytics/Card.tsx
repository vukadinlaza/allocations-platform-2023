import numeral from 'numeral';
import Price from '../../Price';

interface ItemProps {
  title?: string;
  value?: any;
  unit?: string;
  type?: string;
  format?: string;
}

export default function DataCard({ item }: { item: ItemProps }) {
  return (
    <div className="px-3 py-2 bg-white border rounded-lg md:px-4 md:py-3 lg:text-left">
      <p className="mb-1 text-sm font-medium whitespace-nowrap">{item.title}</p>
      <div className="flex items-center justify-start gap-0">
        {item.value > 0 && (
          <div className="text-lg font-medium lg:text-2xl">
            {item.type === 'number' &&
              numeral(item.value).format(item.format || '0,0')}
            {item.type === 'price' && <Price price={item.value} />}
          </div>
        )}
        <div>
          {!item.value && <div className="text-3xl font-medium">-</div>}
          {item.unit && <span className="text-xl">{item.unit}</span>}
        </div>
      </div>
    </div>
  );
}
