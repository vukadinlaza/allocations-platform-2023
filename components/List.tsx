'use client';

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
  headers,
  data
}: {
  headers: [any];
  data: [any];
}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headers &&
              headers.map((x, i) => (
                <TableCell align="left" key={i}>
                  {x.label}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {headers &&
                  headers.map((column, i) => {
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
