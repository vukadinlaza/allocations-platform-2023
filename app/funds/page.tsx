'use client';
import PageList from '@/components/Page/List';
import { PageListData } from '@/types';
import { Card } from '@mui/material';
import { headers_tables } from '../config';

export default function Funds() {
  const data: PageListData = {
    header: {
      name: 'Funds',
      description: 'Manage your funds.',
      buttons: [
        {
          type: 'deal'
        }
      ]
    },
    table: {
      element: 'fund',
      headers: headers_tables.funds,
      origin: 'deals',
      query: '*',
      query_type: 'fund',
      target: 'deals',
      type: 'fund'
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
