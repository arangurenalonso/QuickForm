export type DynamicColumnType =
  | 'InputTypeText'
  | 'InputTypeInteger'
  | 'InputTypeDecimal'
  | 'InputTypeDate'
  | 'InputTypeDatetime'
  | 'InputTypeTime'
  | 'InputTypeBoolean';

export type DynamicTableColumnType = {
  key: string;
  label: string;
  order: number;
  type: DynamicColumnType | string;
  isKey: boolean;
};

export type DynamicTableRowType = Record<string, unknown>;

export type DynamicSubmissionsTableProps = {
  columns: DynamicTableColumnType[];
  rows: DynamicTableRowType[];
  emptyMessage?: string;
  className?: string;
};
