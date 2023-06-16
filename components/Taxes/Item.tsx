'use client';

export default function TaxesItem({ tax }: { tax: any }) {
  return (
    <div className="item">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2">
          <p>{tax.entity_name}</p>
        </div>
        <div className="col-span-2">
          <p>{tax.deal_names}</p>
        </div>
        <div className="col-span-2">
          <p>{tax.tax_year}</p>
        </div>
        <div className="col-span-2">
          <label htmlFor="">{tax.entity_ein}</label>
        </div>
        <div className="col-span-2">
          <label htmlFor="">{tax.provider_id}</label>
        </div>
        <div className="col-span-2">
          <label htmlFor="">{tax.entity_return}</label>
        </div>
        <div className="col-span-2">
          <label htmlFor="">{tax.manage_investor_returns}</label>
        </div>
      </div>
    </div>
  );
}
