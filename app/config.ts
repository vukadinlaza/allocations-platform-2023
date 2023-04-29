export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'SPVs', href: '/spvs' },
  { name: 'Funds', href: '/funds' },
  { name: 'Organizations', href: '/organizations' },
  { name: 'Entities', href: '/entities' }
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
      label: 'Started at',
      key: 'started_at'
    },
    {
      label: 'EIN',
      key: 'ein'
    }
  ],
  entities: [
    {
      label: 'Deal display name',
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
      label: 'Company name',
      key: 'company_name'
    },
    {
      label: 'Entity name',
      key: 'entity_name'
    },
    {
      label: 'Portfolio company name',
      key: 'portfolio_company_name'
    },
    {
      label: 'Status',
      key: 'status'
    },
    {
      key: 'button'
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
      label: 'Creation date',
      key: 'created_at'
    },
    {
      label: 'Total Entities',
      key: 'entities'
    }
  ],
  spvs: [
    {
      label: 'SPV name',
      key: 'name'
    },
    {
      label: 'Company name',
      key: 'company_name'
    },
    {
      label: 'Entity name',
      key: 'entity_name'
    },
    {
      label: 'Portfolio company name',
      key: 'portfolio_company_name'
    },
    {
      label: 'Status',
      key: 'status'
    }
  ]
};
