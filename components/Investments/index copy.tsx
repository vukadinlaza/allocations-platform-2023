'use client';
import { headers_tables } from '@/app/(private)/config';
import PageList from '@/components/Page/List';
import { PageListData } from '@/types';
import Card from '@mui/material/Card';

export default function Investments() {
  const data: PageListData = {
    header: {
      name: 'Investments',
      description: 'Manage your investments.',
      buttons: null
    },
    table: {
      element: 'spv',
      headers: headers_tables.investments,
      origin: 'limited_investments',
      query: '*',
      target: 'investments',
      type: 'investment'
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
