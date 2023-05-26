export interface Accreditation {
  id: string;
  created_at: string;
  user_email: string | null;
  type: string | null;
  user_investment_entity_id: string | null;
  description: string | null;
  value: string | null;
}

export interface Identity {
  id: string;
  user_email?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  type?: string;
  entity_type?: string;
  tax_id?: string;
  tax_id_type?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  region?: string;
  country?: string;
  postal_code?: string;
  us_domestic?: boolean;
  entity_is_disregarded?: boolean;
  ownership_percent?: number;
  phone_number?: string;
  parent_profile_id?: string;
  provider?: string;
  provider_id?: string;
  kyc_status?: string;
  kyb_status?: string;
  date_of_entity_formation?: string;
  legal_name?: string;
  title?: string;
  accreditations?: Accreditation[];
}

export interface User {
  id?: string | undefined;
  created_at?: string;
  updated_at?: string;
  mongo_id?: string | undefined;
  email: string | undefined;
  first_name?: string | undefined;
  investor_type?: string | undefined;
  last_name?: string | undefined;
  is_super_admin?: boolean;
}
