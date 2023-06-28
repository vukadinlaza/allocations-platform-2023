export const true_false = [true, false];

export const deals_status = [
  'draft',
  'submitted',
  'pending',
  'rejected',
  'cancelled',
  'onboarding',
  'closing',
  'closed',
  'archived'
];

export const accreditations_values = [
  // investorAccreditationStatus
  'individual_net_worth',
  'individual_annual_income',
  'entity_no_specific_purpose',
  'finra_licensed_individual',
  'entity_beneficially_owned'
];

export const asset_location = ['Domestic (US)', 'International'];

export const asset_type = [
  'startup',
  'crypto',
  'secondary',
  'real estate',
  'spv into spv',
  'spv into fund',
  'other'
];

export const asset_security_type = [
  'safe',
  'debt',
  'preferred stock',
  'convertible note',
  'LLC interest',
  'LP interest',
  'Forward contract',
  'other'
];

export const deal_advisors_type = [
  'Allocations ERA entity',
  'Not applicable',
  'Other'
];

export const deal_banking_providers = [
  'Allocations Banking Provider',
  'Custom'
];

export const deal_master_series = ['Custom'];

export const deal_master_series_priorities = [
  {
    value: 'Standard',
    label: 'Standard: Could take up to 2 weeks — No additional charge'
  },
  {
    value: 'Expedited',
    label: 'Expedited: 5-6 business days — $450'
  },
  {
    value: 'Super Rush',
    label: 'Super Rush: Within 2 business days — $600'
  }
];

export const deal_master_series_structures = [
  'LLC',
  'LP — Limited Partnership'
];

export const deal_offering_types = ['506b', '506c'];

export const deal_investor_types = [
  'Qualified Purchasers (3c7)',
  'Accredited Investors (3c1)'
];

export const deal_legal_documents = [
  'Allocations Templates',
  'Allocation Redlined Docs',
  'Allocations-approved Custom Docs',
  'New Custom Documents'
];

export const deal_product_types = ['Micro SPV', 'Standard SPV', 'Custom SPV'];

export const pricing = [
  {
    name: 'Micro SPV',
    description: 'Raise up to $100,000',
    price: 3500
  },
  {
    name: 'Standard SPV',
    description: 'The most common SPV',
    price: 8000
  },
  {
    name: 'Custom SPV',
    description: 'For more complex deals',
    price: 14000
  },
  {
    name: 'Traditional Fund',
    description: 'Our world-class Fund product',
    price: 19500
  },
  {
    name: 'Entity upkeep',
    description: 'Charged every year',
    price: 500
  },
  {
    name: 'Entity creation',
    description: 'Allocations to organize Delaware LLC on your behalf',
    price: 1000
  },
  {
    name: 'Expedited priority',
    description: 'Expedited: 5-6 business days',
    price: 450
  },
  {
    name: 'Super rush priority',
    description: 'Within 2 business days',
    price: 600
  }
];

export const deal_management_frequency_fee = ['once', 'annual'];

export const deal_types = ['spv', 'fund'];

export const entity_returns_status = ['complete', 'new'];

export const entity_type = ['Individual', 'Entity'];

export const entity_tax_id_type = ['FTIN', 'ITIN', 'EIN', 'SSN', 'None'];

export const investments_status = [
  'invited',
  'signed',
  'committed',
  'completed',
  'archived'
];

export const investor_types = ['investor', 'fund_manager']

export const organizations_roles = ['Admin', 'Fund Manager'];

export const organizations_status = ['processing', 'complete'];

export const investment_profile_type = ['Individual', 'Entity'];

export const investment_identity_types = [
  'Myself / Individual',
  'LLC',
  'Corporation',
  'Partnership',
  'Trust',
  'Self-directed IRA'
];
