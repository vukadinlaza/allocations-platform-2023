'use client';
import PageList from '@/components/Page/List';
import { headers_tables } from '../config';

export default function SPVS() {
  const header = {
    name: 'SPVs',
    description: 'Manage your spvs.',
    buttons: [
      {
        title: 'Create new'
      }
    ]
  };

  // const dialog = {
  //   type: 'modal',
  //   component: OrganizationNew
  // };

  return (
    <div>
      <PageList
        header={header}
        headersTable={headers_tables.spvs}
        table="deals"
        query={`*`}
        queryType="spv"
      />
    </div>
  );
}
