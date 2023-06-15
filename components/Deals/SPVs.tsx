'use client';
import { headers_tables } from '@/app/(private)/config';
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
      queryType: 'spv',
      target: 'deals',
      orderBy: 'total_raised_amount',
      type: 'spv'
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
