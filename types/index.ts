export * from './deals';
export * from './entities';
export * from './investments';
export * from './organizations';

export interface TabData {
  title: string;
  component?: React.ComponentType;
  disabled?: boolean;
}

type FieldType = 'string' | 'number' | 'boolean' | 'select';

export type Field = {
  key: string;
  label: string;
  type: FieldType; // add more types as needed
  show?: boolean | true;
  disabled?: boolean | false;
  items?: any[] | null | undefined;
};
