'use client';
export default function Price({ price }: { price: any }) {
  return (
    <>
      <span>{price && '$' + (price.toLocaleString('en-US'))}</span>
    </>
  );
}
