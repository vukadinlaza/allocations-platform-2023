'use client';
import Button from '@/components/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import ChipStatus from './ChipStatus';
import DateComponent from './DateComponent';
import None from './None';
import Price from './Price';

export const openURL = (url: string, target = '_self') => {
  window.open(url, target);
};

export type SortConfig = {
  key: string;
  order: 'asc' | 'desc';
};

type Props = {
  data?: any;
  handleSort?: (obj: SortConfig) => any;
  headers?: any;
  sortedBy?: SortConfig;
  table?: string;
  blank_value?: string;
};

export const generateCell = (item: any, column: any, blank_value= 'N/A') => {
  if (!item || !column || !column.key) {
    return blank_value;
  }

  return (
    <>
      {column.key === 'address' && (
        <>
          {item.address_line_1 ||
            (item.address_line_2 &&
              `${item.address_line_1}${
                item.address_line_2 ? ' ' + item.address_line_2 : ''
              }`)}
          {item[column.key]}
        </>
      )}
      {column.type === 'checkbox' && (
        <Image
          src={
            item[column.key]
              ? '/checked_rounded.svg'
              : '/checked_rounded_empty.svg'
          }
          className={`${item[column.key] ? '' : 'opacity-25'} `}
          alt="checked"
          width={24}
          height={24}
        />
      )}
      {column.type === 'chip' && <ChipStatus status={item[column.key]} />}
      {column.type === 'chip-static' && (
        <Chip size={'small'} label={item[column.key]} />
      )}
      {column.type === 'date' && <DateComponent date={item[column.key]} />}
      {column.type === 'entities' && (
        <>
          {item[column.key] && column.sub_key && item.entities[column.sub_key]}
          {item[column.key] && !column.sub_key && item[column.key]
            ? item[column.key].length
            : 0}
        </>
      )}
      {column.type === 'count' && (
        <>
          {/* {column.key
            ? column.key.split('.').reduce((o: any, i: string) => o[i], item)
            : 0} */}
        </>
      )}
      {column.type === 'price' && <Price price={item[column.key]} />}
      {(column.type === 'string' || column.type === 'number') && (
        <span className={column.key}>
          {item[column.key] ? item[column.key] : blank_value}
        </span>
      )}
      {column.type === 'email' && item[column.key] && (
        <Chip
          label={item[column.key] ? item[column.key] : blank_value}
          size="small"
          component="a"
          href={'mailto: ' + item[column.key]}
          clickable
        />
      )}
      {column.type === 'button' && column.key && (<>
        <Button
          onClick={() => column.action(item)}
          label={column.button_label}
          disabled={typeof column.disabled ==='function' ? column.disabled(item) : column.disabled}
          small={true}
        />
      </>)}
      {column.type === 'download' && column.key && (
        <Button
          onClick={() => column.action(item)}
          label="Download"
          disabled={typeof column.disabled ==='function' ? column.disabled(item) : column.disabled}
          small={true}
          icon={
            <Image
              src="/download.svg"
              alt={'Download'}
              className="opacity-75 invert"
              width={24}
              height={24}
            />
          }
        />
      )}
    </>
  );
};

export default function TableComponent({
  handleSort,
  headers,
  data = [],
  sortedBy,
  table,
  blank_value
}: Props) {
  return (
    <div className="w-full">
      {!data.length && <None text="There is no data yet." />}
      {data && data.length > 0 && (
        <TableContainer sx={{ maxHeight: 70000 }} component={Paper}>
          <Table style={{ tableLayout: 'fixed' }} stickyHeader>
            <TableHead>
              <TableRow>
                {headers &&
                  headers.map((x: any, i: any) => (
                    <TableCell
                      align="left"
                      key={x.label}
                      onClick={() => {
                        if (handleSort && sortedBy) {
                          handleSort({
                            key: x.key,
                            order: sortedBy.order === 'desc' ? 'asc' : 'desc'
                          });
                        }
                      }}
                    >
                      <div className="flex items-center cursor-pointer">
                        <span className="text-xs truncate text-bold whitespace-nowrap">
                          {x.label}
                        </span>
                        {x.tooltip && (
                          <Tooltip title={x.tooltip}>
                            <IconButton className="p-0 px-2">
                              <Image
                                width={18}
                                height={18}
                                src="/question.svg"
                                alt="question"
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                        {x && x.label.length > 0 && sortedBy && (
                          <Image
                            src="/arrow.svg"
                            alt={'sort'}
                            className={`ml-1 opacity-50 ${
                              sortedBy.key === x.key &&
                              sortedBy.order === 'desc'
                                ? 'rotate-180'
                                : ''
                            }`}
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
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
                            {generateCell(item, column, blank_value)}
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
