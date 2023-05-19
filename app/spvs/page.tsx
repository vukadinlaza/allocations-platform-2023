'use client';
import PageListNew from '@/components/Page/ListNew';
import { Card } from '@mui/material';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

import { PageListData } from '@/types';

export default function SPVS() {
  const { user } = useAuthContext();

  const data: PageListData = {
    header: {
      name: 'SPVs',
      description: 'Manage your spvs.',
      buttons: {
        new: {
          disabled: false
        }
      }
    },
    table: {
      element: 'spv',
      headers: headers_tables.spvs,
      origin: 'limited_deals',
      query: '*',
      query_type: 'spv'
    },
    model: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        show: true
      }
    ]
  };

  return (
    <Card className="card" variant="outlined">
      <PageListNew data={data} />
    </Card>
  );
}
