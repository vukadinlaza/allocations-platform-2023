'use client';

import { Organization } from '@/types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Paper from '@mui/material/Paper';

export default function OrganizationList({ data }: { data: [Organization] }) {
  const headers = [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Creation date',
      key: 'created_at'
    },
    {
      label: 'Total Entities',
      key: 'total_entities'
    },
    {
      key: 'button'
    }
  ];
  console.log(data);
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
                        <div
                          className={`chip text-white ${
                            item[x.key] === 'Approved'
                              ? 'bg-primary'
                              : 'bg-amber-500'
                          } `}
                        >
                          {item[x.key]}
                        </div>
                      </TableCell>
                    );
                  } else if (x.key === 'migration') {
                    return (
                      <TableCell key={`cell-${i}`} align="left">
                        {item[x.key]}
                      </TableCell>
                    );
                  } else if (x.key === 'type') {
                    return (
                      <TableCell key={`cell-${i}`} align="left">
                        Fund Manager — Guillaume
                        {/* TO DO  */}
                      </TableCell>
                    );
                  } else if (x.key === 'total_entities') {
                    return (
                      <TableCell key={`cell-${i}`} align="left">
                        {Math.floor(Math.random() * 13)}
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
