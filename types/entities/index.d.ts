export interface Entity {
  id?: string;
  created_at?: string;
  name?: string;
  organization_name?: string;
  organization_id?: string;
  mongo_organization_id?: string;
  mongo_deal_id?: string;
  ein?: string;
  user_email?: string;
  fund_manager?: string;
  tax_status?: string;
  return_id?: string;
  is_migration?: boolean;
  type?: string;
  deals?: Deal[] | null;
}
