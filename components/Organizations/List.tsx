'use client';

import * as React from 'react';
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

export default function OrganizationList({ data }: { data: [any] }) {
  const headers = [
    {
      label: 'Legal name',
      key: 'legal_name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Total entities',
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
                      <TableCell align="right">
                        <Button variant="text">Manage</Button>
                      </TableCell>
                    );
                  } else if (x.key === 'status') {
                    return (
                      <TableCell align="left">
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
                    return <TableCell align="left">{item[x.key]}</TableCell>;
                  } else if (x.key === 'type') {
                    return (
                      <TableCell align="left">
                        Fund Manager — Guillaume
                        {/* TO DO  */}
                      </TableCell>
                    );
                  } else if (x.key === 'total_entities') {
                    return (
                      <TableCell align="left">
                        12
                        {/* TO DO  */}
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
