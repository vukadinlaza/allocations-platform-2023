'use client';
import numeral from 'numeral';
export default function Price({ price }: { price: any }) {
  return (
    <div>
      {price > 0 && <span>{numeral(price).format('$0,0')}</span>}
      {!price && <span>-</span>}
    </div>
  );
}
