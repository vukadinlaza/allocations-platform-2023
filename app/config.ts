export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Investments', href: '/investments', showCount: true },
  { name: 'SPVs', href: '/spvs', showCount: true },
  { name: 'Funds', href: '/funds', showCount: true },
  { name: 'Organizations', href: '/organizations', showCount: true },
  { name: 'Migrations', href: '/migrations', showCount: true }
];

export const headers_tables = {
  deals: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Entity name',
      key: 'entity_name' // just for migration
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Total raised',
      key: 'total_raised_amount'
    },
    {
      label: 'EIN',
      key: 'entities',
      sub_key: 'ein'
    }
  ],
  entities: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Tax status',
      key: 'tax_status'
    },
    {
      label: 'Updated date',
      key: 'created_at'
    },
    {
      label: 'EIN',
      key: 'ein'
    }
  ],
  investments: [
    {
      label: 'Deal name',
      key: 'deal_name'
    },
    {
      label: 'Investment amount',
      key: 'subscription_amount'
    },
    {
      label: 'Deal status',
      key: 'status'
    },
    {
      label: '',
      key: 'manage'
    },
    {
      label: '',
      key: 'edit'
    }
  ],
  organizations: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Total deals',
      key: 'total_raised_amount'
    },
    {
      label: '',
      key: 'edit'
    }
  ],
  spvs: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Total raised',
      key: 'total_raised_amount'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Entity name',
      key: 'entity_name' // just for migration
    },
    {
      label: '',
      key: 'manage'
    },
    {
      label: '',
      key: 'edit'
    }
  ],
  funds: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Total raised',
      key: 'total_raised_amount'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Entity name',
      key: 'entity_name' // just for migration
    },
    {
      label: '',
      key: 'edit',
      manage: true
    }
  ]
};
