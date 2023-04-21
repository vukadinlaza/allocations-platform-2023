'use client';

import { Button, Card } from '@mui/material';

export default function MigrationsItem({ item }) {
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
    }
  ];
  return (
    <Card className="card" variant="outlined">
      <div className="grid grid-cols-5 gap-2">
        {headers.map((x, i) => (
          <div>
            <div className="font-bold" key={i}>
              {x.label}
            </div>
            <div>{item[x.key]}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
