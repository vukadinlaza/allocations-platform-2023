export * from './assets';
export * from './deals';
export * from './entities';
export * from './investments';
export * from './organizations';
export * from './user';

type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'select'
  | 'copy'
  | 'date'
  | 'slider'
  | 'multiselect'
  | 'money';

export type Field = {
  disabled?: boolean | false;
  items?: any[] | null | undefined;
  label?: string;
  placeholder?: string;
  key?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  show?: boolean | true;
  limit?: number;
  type: FieldType; // add more types as needed
  value?: any;
  copy?: boolean | false;
};

export interface PageListData {
  header: {
    name: string;
    description: string;
    buttons: any;
  };
  table: {
    element?: string;
    headers?: any[];
    origin?: string;
    query?: string;
    query_type?: string;
    is_migration?: boolean;
    target?: string;
    to_display?: string;
    type?: string;
  };
}
