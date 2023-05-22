'use client';
import PageList from '@/components/Page/List';
import { PageListData } from '@/types';
import { Card } from '@mui/material';
import { headers_tables } from '../config';

export default function SPVS() {
  const data: PageListData = {
    header: {
      name: 'SPVs',
      description: 'Manage your spvs.',
      buttons: [
        {
          type: 'deal'
        }
      ]
    },
    table: {
      element: 'spv',
      headers: headers_tables.spvs,
      origin: 'limited_deals', // RLS POLicy to fetch deals that I own or my organization own
      query: '*',
      query_type: 'spv',
      target: 'deals',
      type: 'spv'
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
