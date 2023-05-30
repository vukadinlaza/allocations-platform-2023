'use client';
import { headers_tables } from '@/app/config';
import PageList from '@/components/Page/List';
import { PageListData } from '@/types';
import Card from '@mui/material/Card';

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
      origin: 'private_deals',
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
