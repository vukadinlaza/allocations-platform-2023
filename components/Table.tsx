'use client';
import { useAuthContext } from '@/app/context';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import Image from 'next/image';
import ChipStatus from './ChipStatus';
import MissingData from './MissingData';
const generateCell = (item: any, column: any) => {
  const no_info = 'None';
  if (!item || !column || !column.key) {
    return no_info;
  }
  if (column.key === 'manage') {
    return <button className="btn primary">View deal</button>;
  }
  if (column.key === 'edit') {
    return (
      <Image
        src="/pen.svg"
        alt={'Edit'}
        className="ml-auto opacity-25 cursor-pointer text-gray"
        width={24}
        height={24}
      />
    );
  }
  if (
    column.key === 'subscription_amount' ||
    column.key === 'capital_wired_amount' ||
    column.key === 'raise_amount'
  ) {
    if (!item[column.key]) return `$0`;
    return `$${item[column.key].toLocaleString('en-US') || 0}`;
  }
  if (
    column.key === 'status' ||
    column.key === 'tax_status' ||
    column.key === 'deal_status'
  )
    return <ChipStatus status={item[column.key]} />;
  if (
    column.key === 'sign_deadline' ||
    column.key === 'created_at' ||
    column.key === 'started_at'
  )
    return dayjs(item[column.key]).format('DD/MM/YYYY') || no_info;
  if (column.key === 'entities') {
    if (item[column.key] && column.sub_key) {
      return item.entities[column.sub_key];
    }
    return item[column.key] ? item[column.key].length : 0;
  }
  return <span>{item[column.key] ? item[column.key] : no_info}</span>;
};

type Props = {
  headers?: any;
  type?: any;
  data?: any;
  model?: any;
  table?: string;
};

export default function TableComponent({
  headers,
  type,
  data,
  model,
  table
}: Props) {
  const { setSlideOver } = useAuthContext();

  return (
    <div className="w-full">
      {data.length < 1 && <MissingData />}
      {data && data.length > 0 && (
        <TableContainer sx={{ maxHeight: 700 }} component={Paper}>
          <Table style={{ tableLayout: 'fixed' }} stickyHeader>
            <TableHead>
              <TableRow>
                {headers &&
                  headers.map((x: any, i: any) => (
                    <TableCell align="left" key={i}>
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
                    onClick={() => {
                      if (type && item && model && data)
                        setSlideOver({
                          isOpen: true,
                          data: item,
                          type,
                          model,
                          table
                        });
                    }}
                  >
                    {headers &&
                      headers.map((column: any, i: any) => {
                        return (
                          <TableCell
                            size="medium"
                            align={column.key === 'edit' ? 'right' : 'left'}
                            key={i}
                          >
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
