import Button from '@/components/_old/base/Button';
import { Divider } from '@tremor/react';
import Search from '@/components/search';
import { FC, ReactNode } from 'react';

// Taylor can you explain this page to me? I don't understand what's going on here. :)
// I'm not sure what the RowData, RowRenderer, RowConfig, and Row types are doing.
// I'm also not sure what the TableProps type is doing.
// I'm also not sure what the Table component is doing.

type RowData = string | object | boolean | number;
type RowRenderer = (row: any, index: number) => ReactNode;
type RowConfig = {
  data: RowData;
  render?: RowRenderer;
};
type Row = {
  [name: string]: ReactNode | RowConfig;
};

interface TableProps<DataType = Row> {
  title: string;
  description?: string;
  rows: DataType[];
  columns: {
    name: string;
    label: string;
  }[];
}

const Table: FC<TableProps> = ({ rows, columns, title, description }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex">
        <div className="sm:flex-auto w-full">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 flex-none">
          <Button>Create new</Button>
        </div>
      </div>
      <Divider />
      <Search />
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="block min-w-full py-2 align-middle">
            <table className="w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {columns.map(({ label, name }) => (
                    <th
                      key={`${name}-col`}
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white w-full">
                {rows.map((row, index) => (
                  <tr key={`row-${index}`}>
                    {columns.map(({ name }, colIndex) => {
                      if (
                        row[name] &&
                        typeof row[name] === 'object' &&
                        (row[name] as RowConfig).render
                      ) {
                        return (
                          <td
                            key={`${name}-${index}-${colIndex}`}
                            className="whitespace-nowrap px-3 py-5 text-sm text-gray-500"
                          >
                            {(row[name] as unknown as RowConfig).render!(
                              (row[name] as unknown as RowConfig).data,
                              index
                            )}
                          </td>
                        );
                      }
                      return (
                        <td
                          key={`${name}-${index}-${colIndex}`}
                          className="whitespace-nowrap px-3 py-5 text-sm text-gray-500"
                        >
                          <div className="text-gray-900">
                            {row[name] as ReactNode}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
