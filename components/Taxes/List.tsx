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

export default function TaxesList({ data }: { data: [any] }) {
  const headers = [
    {
      label: 'Deal name',
      key: 'deal_name'
    },
    {
      label: 'GoSystems Return ID',
      key: 'metadata.gosystem_return_id'
    },
    {
      label: 'EIN',
      key: 'entity.ein'
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
                      <Button>Manage</Button>
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
