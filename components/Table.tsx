'use client';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ChipStatus from './ChipStatus';
import DateComponent from './DateComponent';
import None from './None';
import Price from './Price';

export const openURL = (url: string, target = '_self') => {
  window.open(url, target);
};

type Props = {
  headers?: any;
  data?: any;
  table?: string;
};

export default function TableComponent({ headers, data = [], table }: Props) {
  const generateCell = (item: any, column: any) => {
    const no_info = null;
    if (!item || !column || !column.key) {
      return no_info;
    }
    if (column.key === 'address') {
      if (item.address_line_1 || item.address_line_2) {
        return `${item.address_line_1}${
          item.address_line_2 ? ' ' + item.address_line_2 : ''
        }`;
      }
      return item[column.key];
    }
    if (column.type === 'chip') return <ChipStatus status={item[column.key]} />;
    if (column.type === 'date')
      return <DateComponent date={item[column.key]} />;
    if (column.key === 'entities') {
      if (item[column.key] && column.sub_key) {
        return item.entities[column.sub_key];
      }
      return item[column.key] ? item[column.key].length : 0;
    }
    if (column.type === 'price') return <Price price={item[column.key]} />;
    if (column.type === 'string' || column.type === 'number')
      return <span>{item[column.key] ? item[column.key] : no_info}</span>;
    if (column.type === 'email')
      return (
        item[column.key] && (
          <Chip
            label={item[column.key] ? item[column.key] : no_info}
            size="small"
            component="a"
            href={'mailto: ' + item[column.key]}
            clickable
          />
        )
      );
    return <span>{item[column.key] ? item[column.key] : no_info}</span>;
  };

  return (
    <div className="w-full">
      {!data.length && <None text="There is no data yet." />}
      {data && data.length > 0 && (
        <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
          <Table style={{ tableLayout: 'fixed' }} stickyHeader>
            <TableHead>
              <TableRow>
                {headers &&
                  headers.map((x: any, i: any) => (
                    <TableCell align="left" key={x.label}>
                      <span className="text-base text-bold">{x.label}</span>
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item: any, index: any) => (
                  <TableRow
                    key={index}
                    className="transition cursor-pointer hover:bg-gray-50"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {headers &&
                      headers.map((column: any, i: any) => {
                        return column.manage ? (
                          <TableCell
                            key={i}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'end'
                            }}
                          >
                            <button
                              onClick={() =>
                                openURL(`${table}/${item.id}`, column.target)
                              }
                              className="mr-2 btn primary"
                            >
                              View
                            </button>
                          </TableCell>
                        ) : (
                          <TableCell size="medium" key={i}>
                            {generateCell(item, column)}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
