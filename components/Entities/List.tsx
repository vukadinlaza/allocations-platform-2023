'use client';

import {
  Button,
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

export default function MigrationsList({ data }: { data: [any] }) {
  const headers = [
    {
      label: 'Deal display name',
      key: 'name'
    },
    {
      label: 'Tax status',
      key: 'tax_status'
    },
    {
      label: 'Updated date',
      key: 'created_at'
    },
    {
      label: 'EIN',
      key: 'ein'
    }
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {headers.map((x, i) => (
              <TableCell align="left" key={i}>
                {x.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {headers.map((x, i) => {
                if (x.key === 'button') {
                  return (
                    <TableCell key={`cell-${i}`} align="right">
                      <Button variant="text">Manage</Button>
                    </TableCell>
                  );
                } else if (x.key === 'tax_status') {
                  return (
                    <TableCell key={`cell-${i}`} align="left">
                      <Chip
                        label={item[x.key] || 'No status'}
                        color="warning"
                      />
                    </TableCell>
                  );
                } else if (x.key === 'created_at') {
                  return (
                    <TableCell key={`cell-${i}`} align="left">
                      {dayjs(item[x.key]).format('MM/DD/YYYY')}
                    </TableCell>
                  );
                } else if (x.key === 'ein') {
                  return (
                    <TableCell key={`cell-${i}`} align="left">
                      {item[x.key] || 'No ein provided'}
                    </TableCell>
                  );
                }
                return (
                  <TableCell align="left" key={i}>
                    {item[x.key]}
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
