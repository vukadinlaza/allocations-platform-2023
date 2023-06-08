import { generateCell, openURL } from '@/components/Table';

export default function TableResponsive({
  data,
  headers,
  table
}: {
  data: any;
  headers?: any;
  table?: string;
}) {
  return (
    <div className="w-full table--responsive">
      {data &&
        data.map((item: any, index: any) => (
          <div
            key={index}
            className="table--responsive--card"
            onClick={() => openURL(`${table}/${item.id}`)}
          >
            <div className="grid w-full gap-2">
              {headers &&
                headers
                  .filter((x: any) => !x.manage)
                  .map((column: any, i: any) => (
                    <div className="truncate" key={i}>
                      {generateCell(item, column)}
                    </div>
                  ))}
            </div>
          </div>
        ))}
    </div>
  );
}
