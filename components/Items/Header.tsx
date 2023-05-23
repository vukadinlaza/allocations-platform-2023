'use client';

import ChipStatus from '@/components/ChipStatus';

export default function ItemHeader({
  data,
  button
}: {
  data: any;
  button?: any;
}) {
  return (
    <div>
      <header className="flex items-start justify-start mb-8">
        <div className="flex items-center justify-center w-16 h-16 mt-1 mr-4 text-white rounded bg-primary-500">
          {!data.name && <h1 className="mb-0 text-3xl">N</h1>}
          {data.name && <h1 className="mb-0 text-3xl">{data.name[0]}</h1>}
        </div>
        <div className="flex flex-col items-start gap-2 grow">
          {data.name && <h1 className="mb-0 text-3xl">{data.name}</h1>}
          <div className="flex items-center gap-2">
            {data.status && <ChipStatus small status={data.status} />}
            {/* {data.accept_crypto && <ChipStatus small status={'Crypto'} />} */}
            {/* <p className="text-sm">
              <span>
                • Total raised:
                {<Price price={data.total_raised_amount} />}
              </span>
            </p> */}
          </div>
        </div>
        {button && <div>{button}</div>}
      </header>
    </div>
  );
}
