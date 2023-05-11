// 'use client';
// import PageList from '@/components/Page/List';
// import { headers_tables } from '../config';

// export default function Investments() {
//   const header = {
//     name: 'Investments',
//     description: 'Manage your investments.',
//     buttons: [
//       // {
//       //   title: 'Create new'
//       // }
//     ]
//   };

//   // const dialog = {
//   //   type: 'modal',
//   //   component: InvestmentsNew
//   // };

//   return (
//     <div>
//       <PageList
//         header={header}
//         headersTable={headers_tables.investments}
//         table="hydrated_investments"
//         query={`*`}
//         type="investment"
//       />
//     </div>
//   );
// }

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

  const model: Field[] | null = user.is_super_admin
    ? [
        {
          key: 'id',
          label: 'ID',
          type: 'string',
          show: user.is_super_admin,
          copy: true,
          disabled: true
        },
        {
          key: 'deal_id',
          label: 'Deal ID',
          type: 'string',
          show: user.is_super_admin,
          copy: true,
          disabled: true
        },
        {
          key: 'mongo_deal_id',
          label: 'Mongo Deal ID',
          type: 'string',
          show: user.is_super_admin,
          copy: true,
          disabled: true
        },
        {
          key: 'mongo_investment_id',
          label: 'Mongo Investment ID',
          type: 'string',
          show: user.is_super_admin,
          copy: true,
          disabled: true
        },
        {
          key: 'mongo_user_id',
          label: 'Mongo User ID',
          type: 'string',
          show: user.is_super_admin,
          copy: true,
          disabled: true
        },
        {
          key: 'created_at',
          label: 'Created At',
          type: 'date',
          show: user.is_super_admin,
          copy: true,
          disabled: true
        },
        {
          key: 'user_email',
          label: 'User Email',
          type: 'string',
          show: user.is_super_admin,
          copy: true,
          disabled: true
        },
        {
          key: 'bluesky_fees',
          label: 'Bluesky Fees',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'capital_wired_amount',
          label: 'Capital Wired Amount',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'carry',
          label: 'Carry',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'complete_at',
          label: 'Complete At',
          type: 'string',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'invited_at',
          label: 'Invited At',
          type: 'string',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'ledger_matched',
          label: 'Ledger Matched',
          type: 'select',
          show: user.is_super_admin,
          copy: true,
          items: true_false
        },
        {
          key: 'management_fee_percent',
          label: 'Management Fee Percent',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'management_fees_dollars',
          label: 'Management Fees Dollars',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'net_investment',
          label: 'Net Investment',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'other_expenses_2022',
          label: 'Other Expenses 2022',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'private_fund_expenses',
          label: 'Private Fund Expenses',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'spv_fees',
          label: 'SPV Fees',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        },
        {
          key: 'status',
          label: 'Status',
          type: 'select',
          show: user.is_super_admin,
          items: ['Processing', 'Complete']
        },
        {
          key: 'subscription_amount',
          label: 'Subscription Amount',
          type: 'number',
          show: user.is_super_admin,
          copy: true
        }
      ]
    : null;
  
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
