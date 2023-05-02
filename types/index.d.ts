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
}

export interface Migration {
  legal_entity_id?: string;
  name?: string;
  organization_id?: string;
  ein?: string;
  organization_name?: string;
}

export interface Organization {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  mongo_id?: string;
  name?: string;
  slug?: string;
  approved?: string;
  high_volume_partner?: boolean;
  legal_name?: string;
  mou_signed?: boolean;
  phase?: string;
  entities?: Organization[] | null;
}

export interface TabData {
  title: string;
  component?: React.ComponentType;
  disabled?: boolean;
}

export interface UserInfos {
  id?: null | string;
  created_at?: string | Date;
  updated_at?: string | Date;
  email?: string;
  first_name?: string;
  last_name?: string;
  investor_type?: null | string;
  is_super_admin?: boolean;
  mongo_id?: string;
}

export interface UserOrganization {
  id?: string;
  created_at?: string;
  organization_id?: string | null;
  is_admin?: boolean | null;
  organization_mongo_id?: string | null;
  invite?: boolean | null;
  user_mongo_id?: string | null;
  user_email?: string | null;
  organizations?: Organization[] | null;
}

export interface UserSession {
  created_at?: string;
  email?: string;
  first_name?: string;
  id?: string | null;
  investor_type?: string | null;
  is_super_admin?: boolean;
  last_name?: string;
  mongo_id?: string;
  updated_at?: string;
}

export interface UserInterface extends UserSession {
  entities?: Entity[] | null;
  currentOrganization?: string | null;
  infos?: UserInfos | null;
  is_super_admin?: boolean;
  organizations?: Organization[] | null;
  users_organizations?: UserOrganization[] | undefined;
}
