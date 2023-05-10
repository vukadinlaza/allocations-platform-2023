import { Deal } from '../deals';
import { Entity } from '../entities';

export interface Organization {
  id?: string;
  created_at?: string;
  updated_at?: string;
  status?: string | null;
  mongo_id?: string | null;
  name?: string | null;
  slug?: string | null;
  approved?: string | null;
  high_volume_partner?: boolean;
  legal_name?: string | null;
  mou_signed?: boolean;
  phase?: string | null;
  is_archived?: boolean | false;
  entities?: Entity[] | null;
  deals?: Deal[] | null;
}
