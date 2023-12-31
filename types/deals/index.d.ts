import { Asset } from './index.d';

export interface Deal {
  id?: string;
  created_at?: string;
  updated_at?: string;
  assets?: Asset[];
  asset_id?: string;
  advisor_type?: string;
  accept_crypto?: boolean;
  agree_costs?: boolean;
  agree_msa?: boolean;
  agree_setup?: boolean;
  total_carry?: number;
  closing_date?: string;
  closed?: boolean;
  company_name?: string;
  deal_term?: string;
  deal_details_id?: string;
  description?: string;
  documents?: string;
  documents_template_id?: string;
  elevated_returns?: boolean;
  entity_id?: string;
  entity_name?: string;
  fund_manager_email?: string;
  investor_type?: string;
  international_investors?: boolean;
  invited_investors?: string;
  legal_template_option?: string;
  legacy_manager_email?: string;
  legacy_manager_name?: string;
  legacy_organization_name?: string;
  management_fee?: string;
  management_fee_dollar?: string;
  management_fee_frequency?: string;
  management_fee_percent?: string;
  management_fee_type?: string;
  manager_email?: string;
  manager_type?: string;
  master_series?: string;
  memo?: string;
  minimum_investment?: number;
  mongo_id?: string;
  mongo_organization_id?: string;
  name?: string;
  organization_id?: string;
  offering_type?: string;
  onboarding_link?: string;
  owner_mongo_id?: string;
  portfolio_company_name?: string;
  series_name?: string;
  setup_cost?: string;
  side_letters?: boolean;
  sign_deadline?: string;
  status?: string;
  total_raised_amount?: number;
  target?: string;
  target_raise_goal?: number;
  total_carry?: number;
  total_round_size?: string;
  type?: string;
  wire_deadline?: string;
  user_email?: string;
  sub_type: string | null;
}
