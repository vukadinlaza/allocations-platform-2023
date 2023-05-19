'use client';
import PageList from '@/components/Page/List';
import { Card } from '@mui/material';
import { headers_tables } from '../config';

import { PageListData } from '@/types';

export default function Funds() {
  const data: PageListData = {
    header: {
      name: 'Funds',
      description: 'Manage your funds.',
      buttons: {
        new: {
          disabled: false
        }
      }
    },
    table: {
      element: 'fund',
      headers: headers_tables.funds,
      origin: 'limited_deals',
      query: '*',
      query_type: 'fund',
      target: 'deals'
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
