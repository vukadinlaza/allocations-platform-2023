'use client';
import numeral from 'numeral';
export default function Price({ price }: { price: any }) {
  return (
    <span>
      {price && (
        <>
          {price > 0 && <span>{numeral(price).format('$0,0')}</span>}
          {price <= 0 && <span>{numeral(0).format('$0,0')}</span>}
        </>
      )}
    </span>
  );
}
