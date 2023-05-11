export * from './deals';
export * from './entities';
export * from './investments';
export * from './organizations';

export interface TabData {
  title: string;
  component?: React.ComponentType;
  disabled?: boolean;
}

type FieldType = 'string' | 'number' | 'boolean' | 'select' | 'copy' | 'date';

export type Field = {
  disabled?: boolean | false;
  items?: any[] | null | undefined;
  label: string;
  key: string;
  show?: boolean | true;
  type: FieldType; // add more types as needed
  value?: any;
  copy?: boolean | false;
};
