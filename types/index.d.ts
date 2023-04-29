export interface Migration {
  legal_entity_id?: string;
  name?: string;
  organization_id?: string;
  ein?: string;
  organization_name?: string;
}

export interface Organization {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  mongo_id?: string;
  name?: string;
  slug?: string;
  approved?: string;
  high_volume_partner?: boolean;
  legal_name?: string;
  mou_signed?: boolean;
  phase?: string;
}

export interface TabData {
  title: string;
  component?: React.ComponentType;
  disabled?: boolean;
}
