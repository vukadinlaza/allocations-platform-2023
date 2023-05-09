'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/Page/List';
import { useRouter } from 'next/navigation';

const Identities = () => {
  const router = useRouter();
  const getHeader = () => {
    return {
      name: 'Identities',
      description: 'Manage your identities.',
      buttons: [
        {
          title: 'Create new',
          action: async () => {
            await router.push('/identities/create');
          }
        }
      ]
    };
  };
  return (
    <PageList
      header={getHeader()}
      headersTable={headers_tables.deals}
      table="identities"
      type="identities"
      query={`*`}
    />
  );
};

export default Identities;
