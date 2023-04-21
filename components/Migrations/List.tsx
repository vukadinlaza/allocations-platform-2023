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

const MigrationsPhaseTag = (value: string) => {
  return <Chip label="Processing" color="warning" />;
};

export default function MigrationsList({ data }: { data: [any] }) {
  const headers = [
    {
      label: 'Deal display name',
      key: 'name'
    },
    {
      label: 'Phase',
      key: 'phase'
    },
    {
      label: 'First close date',
      key: 'created_at'
    },
    {
      label: 'EIN',
      key: 'ein'
    },
    {
      label: '',
      key: 'button'
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
                    <TableCell align="right">
                      <Button color="primary">Manage</Button>
                    </TableCell>
                  );
                } else if (x.key === 'phase') {
                  return (
                    <TableCell align="left">
                      {MigrationsPhaseTag(item[x.key])}
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
