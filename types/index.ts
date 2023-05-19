export * from './deals';
export * from './entities';
export * from './investments';
export * from './organizations';
export * from './user';

type FieldType = 'string' | 'number' | 'boolean' | 'select' | 'copy' | 'date';

export interface TabData {
  title: string;
  component?: React.ComponentType;
  disabled?: boolean;
}

export type Field = {
  disabled?: boolean | false;
  items?: any[] | null | undefined;
  label: string;
  placeholder?: string;
  key: string;
  show?: boolean | true;
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
  model: Field[];
  table: {
    element?: string;
    headers?: any[];
    origin?: string;
    query?: string;
    query_type?: string;
    target?: string;
    type?: string;
  };
}
