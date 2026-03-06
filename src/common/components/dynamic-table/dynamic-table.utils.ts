import { DynamicTableColumnType } from './dynamic-table.types';

export type ColumnSize = {
  minWidth: number;
  maxWidth: number;
  align: 'left' | 'center' | 'right';
};

const DEFAULT_SIZE: ColumnSize = {
  minWidth: 160,
  maxWidth: 240,
  align: 'left',
};

export function getColumnSize(column: DynamicTableColumnType): ColumnSize {
  if (column.key === 'submissionId') {
    return {
      minWidth: 220,
      maxWidth: 320,
      align: 'left',
    };
  }

  if (column.key === 'submittedAt') {
    return {
      minWidth: 180,
      maxWidth: 220,
      align: 'left',
    };
  }

  switch (column.type) {
    case 'InputTypeText':
      return {
        minWidth: 180,
        maxWidth: 320,
        align: 'left',
      };

    case 'InputTypeInteger':
      return {
        minWidth: 110,
        maxWidth: 140,
        align: 'right',
      };

    case 'InputTypeDecimal':
      return {
        minWidth: 130,
        maxWidth: 160,
        align: 'right',
      };

    case 'InputTypeDate':
      return {
        minWidth: 130,
        maxWidth: 150,
        align: 'left',
      };

    case 'InputTypeDatetime':
      return {
        minWidth: 180,
        maxWidth: 220,
        align: 'left',
      };

    case 'InputTypeTime':
      return {
        minWidth: 100,
        maxWidth: 120,
        align: 'left',
      };

    case 'InputTypeBoolean':
      return {
        minWidth: 100,
        maxWidth: 110,
        align: 'center',
      };

    default:
      return DEFAULT_SIZE;
  }
}

export function getAlignClass(align: ColumnSize['align']): string {
  switch (align) {
    case 'right':
      return 'text-right';
    case 'center':
      return 'text-center';
    default:
      return 'text-left';
  }
}

export function formatCellValue(value: unknown, type: string): string {
  if (value === null || value === undefined) return '';

  if (type === 'InputTypeBoolean') {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }

  if (type === 'InputTypeDecimal') {
    if (typeof value === 'number') {
      return Number.isInteger(value) ? value.toString() : value.toFixed(2);
    }
    return String(value);
  }

  if (type === 'InputTypeInteger') {
    if (typeof value === 'number') return Math.trunc(value).toString();
    return String(value);
  }

  return String(value);
}

export function shouldTruncate(type: string, key: string): boolean {
  if (key === 'submissionId') return true;

  switch (type) {
    case 'InputTypeText':
    case 'InputTypeDate':
    case 'InputTypeDatetime':
    case 'InputTypeTime':
      return true;
    default:
      return false;
  }
}
