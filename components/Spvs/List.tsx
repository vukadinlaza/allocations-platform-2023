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

export default function SPVSList({ data }: { data: [any] }) {
  const headers = [
    {
      label: 'SPV name',
      key: 'name'
    },
    {
      label: 'Company name',
      key: 'company_name'
    },
    {
      label: 'Entity name',
      key: 'entity_name'
    },
    {
      label: 'Portfolio company name',
      key: 'portfolio_company_name'
    },
    {
      label: 'Status',
      key: 'status'
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
                } else if (x.key === 'status') {
                  return (
                    <TableCell key={`cell-${i}`} align="left">
                      <Chip
                        label={item[x.key] || 'No status'}
                        color="warning"
                      />
                    </TableCell>
                  );
                } else if (x.key === 'sign_deadline') {
                  return (
                    <TableCell key={`cell-${i}`} align="left">
                      {dayjs(item[x.key]).format('DD/MM/YYYY') || 'No deadline'}
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
