export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'SPVs', href: '/spvs', showCount: true },
  { name: 'Funds', href: '/funds', showCount: true },
  { name: 'Organizations', href: '/organizations', showCount: true },
  { name: 'Investments', href: '/investments', showCount: true }
  // { name: 'Entities', href: '/entities', showCount: true },
];

export const headers_tables = {
  deals: [
    {
      label: 'Deal display name',
      key: 'name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Created at',
      key: 'created_at'
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
  funds: [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Total raised',
      key: 'total_raised'
    },
    {
      label: '',
      key: 'edit'
    }
  ],
  investments: [
    {
      label: 'Deal name',
      key: 'name'
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
      key: 'entities'
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
      label: 'Status',
      key: 'status'
    },
    {
      label: 'Total raised',
      key: 'total_raised'
    },
    {
      label: '',
      key: 'edit'
    }
  ]
};
