'use client';
import PageList from '@/components/Page/List';
import Card from '@mui/material/Card';
import { headers_tables } from '../config';

import { PageListData } from '@/types';

export default function Funds() {
  const data: PageListData = {
    header: {
      name: 'Organizations',
      description: 'Manage your organizations.',
      buttons: [
        {
          type: 'organization'
        }
      ]
    },
    table: {
      element: 'organization',
      headers: headers_tables.organizations,
      origin: 'organizations_roles',
      query: '*, organizations (*)',
      target: 'organizations',
      to_display: 'organizations'
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
