'use client';
import PageList from '@/components/Page/List';
import { PageListData } from '@/types';
import { Card } from '@mui/material';
import { headers_tables } from '../config';

export default function Migrations() {
  const data: PageListData = {
    header: {
      name: 'Migrations',
      description: 'Manage your migrations.',
      buttons: null
    },
    table: {
      element: 'deal',
      headers: headers_tables.migrations,
      origin: 'limited_deals',
      query: '*',
      target: 'deals',
      type: 'deal',
      is_migration: true
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
