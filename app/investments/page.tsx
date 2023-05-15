'use client';
import PageList from '@/components/Page/List';
import { Field } from '@/types';
import { true_false } from '@/types/values';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function Investments() {
  const { user } = useAuthContext();
  const header = {
    name: 'Investments',
    description: 'Manage your investments.'
  };

  const model: Field[] | null = null;
  
  return (
    <div>
      <PageList
        header={header}
        headersTable={headers_tables.investments}
        query={`*`}
        model={model}
        table="hydrated_investments"
        type="investment"
      />
    </div>
  );
}
