import {
  DynamicTableColumnType,
  DynamicTablePinnedOffsetsType,
} from './dynamic-table.types';
import {
  formatCellValue,
  getAlignClass,
  getColumnSize,
  shouldTruncate,
} from './dynamic-table.utils';

type Props = {
  column: DynamicTableColumnType;
  value: unknown;
  pinnedOffsets: DynamicTablePinnedOffsetsType;
};

const DynamicTableCell = ({ column, value, pinnedOffsets }: Props) => {
  const size = getColumnSize(column);
  const displayValue = formatCellValue(value);
  const truncate = shouldTruncate(column.type);
  const showPreview = truncate && displayValue.length > 20;

  const isPinnedLeft = column.pinned === 'left';
  const isPinnedRight = column.pinned === 'right';
  const isPinned = isPinnedLeft || isPinnedRight;

  return (
    <td
      className={[
        'group/cell relative border-b px-4 py-3 text-sm align-middle',
        'border-slate-100 text-slate-700 dark:border-slate-700 dark:text-slate-200',
        'bg-[var(--row-bg)]',
        getAlignClass(size.align),
        isPinned ? 'sticky z-[5]' : '',
      ].join(' ')}
      style={{
        minWidth: `${size.minWidth}px`,
        maxWidth: `${size.maxWidth}px`,
        width: `${size.maxWidth}px`,
        ...(isPinnedLeft
          ? { left: `${pinnedOffsets.leftOffsets[column.key] ?? 0}px` }
          : {}),
        ...(isPinnedRight
          ? { right: `${pinnedOffsets.rightOffsets[column.key] ?? 0}px` }
          : {}),
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
          <div className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-max max-w-[420px] rounded-lg border border-slate-200 bg-white p-3 text-left text-sm text-slate-700 shadow-xl group-hover/cell:block dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
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
