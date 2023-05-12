export interface Investment {
  mongo_investment_id?: string;
  mongo_deal_id?: string;
  mongo_user_id?: string;
  capital_wired_amount?: number | null;
  subscription_amount?: number;
  ledger_matched?: boolean | null;
  management_fee_percent?: number | null;
  carry?: number | null;
  spv_fees?: number | null;
  bluesky_fees?: number | null;
  management_fees_dollars?: number | null;
  private_fund_expenses?: number | null;
  other_expenses_2022?: number | null;
  net_investment?: number | null;
  completed_at?: string;
  invited_at?: string;
  status?: string;
  updated_at?: string;
}

