'use client';

import { useAuthContext } from '@/app/context';
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';

const generateCell = (item: any, column: any) => {
  const no_info = 'No information available';
  if (column.key === 'status' || column.key === 'tax_status')
    return <Chip label={item[column.key] || no_info} color="warning" />;
  if (
    column.key === 'sign_deadline' ||
    column.key === 'created_at' ||
    column.key === 'started_at'
  )
    return dayjs(item[column.key]).format('DD/MM/YYYY') || no_info;
  if (column.key === 'entities') return item[column.key].length || 0;
  return <span>{item[column.key]}</span>;
};

export default function List({
  headers = null,
  type = null,
  data = null
}: {
  headers: any;
  type: any;
  data: any;
}) {
  const { setSlideOver } = useAuthContext();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headers &&
              headers.map((x: any, i: any) => (
                <TableCell align="left" key={i}>
                  {x.label}
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
                  if (type) setSlideOver(true, item, type);
                }}
              >
                {headers &&
                  headers.map((column: any, i: any) => {
                    return (
                      <TableCell align="left" key={i}>
                        {generateCell(item, column)}
                      </TableCell>
                    );
                  })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
