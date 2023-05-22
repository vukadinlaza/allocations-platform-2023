// 'use client';
// import PageList from '@/components/Page/List';
// import { Field } from '@/types';
// import { Card } from '@mui/material';
// import { headers_tables } from '../config';
// import { useAuthContext } from '../context';

// export default function Investments() {
//   const { user } = useAuthContext();
//   const header = {
//     name: 'Investments',
//     description: 'Manage your investments.'
//   };

//   const model: Field[] | null = null;

//   return (
//     <Card className="card" variant="outlined">
//       <PageList
//         header={header}
//         headersTable={headers_tables.investments}
//         query={`*`}
//         model={model}
//         table="hydrated_investments"
//         type="investment"
//       />
//     </Card>
//   );
// }

'use client';
import PageList from '@/components/Page/List';
import { PageListData } from '@/types';
import { Card } from '@mui/material';
import { headers_tables } from '../config';

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
      origin: 'investments',
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
