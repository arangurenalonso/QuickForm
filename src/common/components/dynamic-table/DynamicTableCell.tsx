import { DynamicTableColumnType } from './dynamic-table.types';
import {
  formatCellValue,
  getAlignClass,
  getColumnSize,
  shouldTruncate,
} from './dynamic-table.utils';

type Props = {
  column: DynamicTableColumnType;
  value: unknown;
};

const DynamicTableCell = ({ column, value }: Props) => {
  const size = getColumnSize(column);
  const displayValue = formatCellValue(value, column.type);
  const truncate = shouldTruncate(column.type, column.key);
  const showPreview = truncate && displayValue.length > 20;

  return (
    <td
      className={[
        'group relative border-b border-slate-100 px-4 py-3 text-sm text-slate-700 align-middle',
        getAlignClass(size.align),
        column.isKey ? 'sticky left-0 z-[5] bg-inherit' : '',
      ].join(' ')}
      style={{
        minWidth: `${size.minWidth}px`,
        maxWidth: `${size.maxWidth}px`,
        width: `${size.maxWidth}px`,
      }}
    >
      <div className="relative overflow-visible">
        <span
          className={
            truncate
              ? 'block overflow-hidden text-ellipsis whitespace-nowrap'
              : 'block whitespace-nowrap'
          }
          title={displayValue}
        >
          {displayValue || '—'}
        </span>

        {showPreview ? (
          <div className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-max max-w-[420px] rounded-lg border border-slate-200 bg-white p-3 text-left text-sm text-slate-700 shadow-xl group-hover:block">
            <div className="whitespace-pre-wrap break-words">
              {displayValue}
            </div>
          </div>
        ) : null}
      </div>
    </td>
  );
};

export default DynamicTableCell;
