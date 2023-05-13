export interface Accreditation {
  id: string;
  created_at: string;
  user_email: string | null;
  type: string | null;
  user_investment_entity_id: string | null;
  description: string | null;
  value: string | null;
}

export interface UserInvestmentEntity {
  accreditations?: Accreditation[];
  created_at: string;
  id: string;
  mongo_user_id: null | string;
  name: string;
  type: string;
  user_email: string;
  value: null | string;
}
