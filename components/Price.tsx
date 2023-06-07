'use client';
import numeral from 'numeral';
export default function Price({ price }: { price: any }) {
  return (
    <span>
      {price !== null && (
        <>
          <span>{numeral(price).format('$0,0')}</span>
        </>
      )}
    </span>
  );
}
