// 'use client';
// import PageList from '@/components/Page/List';
// import { Field } from '@/types';
// import { Card } from '@mui/material';
// import { headers_tables } from '../config';
// import { useAuthContext } from '../context';

// export default function Organizations() {
//   const { user } = useAuthContext();
//   const header = {
//     name: 'Organizations',
//     description: 'Manage your organizations.',
//     buttons: [
//       {
//         title: 'Create new',
//         action: 'modal'
//       }
//     ]
//   };

//   const model: Field[] = [
//     {
//       key: 'name',
//       label: 'Name',
//       type: 'string',
//       show: true
//     }
//   ];

//   const dialog = {
//     element: 'organization',
//     table: 'organizations',
//     type: 'FormsNew'
//   };

//   return (
//     <Card className="card" variant="outlined">
//       <PageList
//         dialog={dialog}
//         header={header}
//         headersTable={headers_tables.organizations}
//         model={model}
//         query={`*, organizations (*)`}
//         table="organizations_roles"
//         target="organizations"
//         type="organization"
//       />
//     </Card>
//   );
// }

'use client';
import PageList from '@/components/Page/List';
import { Card } from '@mui/material';
import { headers_tables } from '../config';

import { PageListData } from '@/types';

export default function Funds() {
  const data: PageListData = {
    header: {
      name: 'Organizations',
      description: 'Manage your organizations.',
      buttons: {
        new: {
          disabled: false
        }
      }
    },
    table: {
      element: 'organization',
      headers: headers_tables.organizations,
      origin: 'organizations_roles',
      query: '*, organizations (*)',
      target: 'organizations'
    }
  };

  return (
    <Card className="card" variant="outlined">
      <PageList data={data} />
    </Card>
  );
}
