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
import dayjs from 'dayjs';

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
      key: 'entities'
    },
    {
      key: 'button'
    }
  ];

  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {data.length > 0 &&
                headers &&
                headers.map((x, i) => (
                  <TableCell align="left" key={i}>
                    {x.label}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
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
                    } else if (x.key === 'created_at') {
                      return (
                        <TableCell key={`cell-${i}`} align="left">
                          {dayjs(item[x.key]).format('DD/MM/YYYY')}
                        </TableCell>
                      );
                    } else if (x.key === 'type') {
                      return (
                        <TableCell key={`cell-${i}`} align="left">
                          Fund Manager — Guillaume
                          {/* TO DO  */}
                        </TableCell>
                      );
                    } else if (x.key === 'entities') {
                      return (
                        <TableCell key={`cell-${i}`} align="left">
                          {item[x.key].length || 0}
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
    </div>
  );
}
