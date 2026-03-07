import {
  DynamicTableColumnType,
  DynamicTablePinnedOffsetsType,
} from './dynamic-table.types';
import { getAlignClass, getColumnSize } from './dynamic-table.utils';

type DynamicTableHeaderProps = {
  columns: DynamicTableColumnType[];
  pinnedOffsets: DynamicTablePinnedOffsetsType;
};

const DynamicTableHeader = ({
  columns,
  pinnedOffsets,
}: DynamicTableHeaderProps) => {
  return (
    <thead className="bg-slate-50 dark:bg-slate-800">
      <tr>
        {columns.map((column) => {
          const size = getColumnSize(column);
          const isPinnedLeft = column.pinned === 'left';
          const isPinnedRight = column.pinned === 'right';
          const isPinned = isPinnedLeft || isPinnedRight;

          return (
            <th
              key={column.key}
              className={[
                'sticky top-0 border-b px-4 py-3 text-xs font-semibold uppercase tracking-wide',
                'border-slate-200 bg-slate-50 text-slate-600',
                'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200',
                getAlignClass(size.align),
                isPinned ? 'z-20' : 'z-10',
              ].join(' ')}
              style={{
                minWidth: `${size.minWidth}px`,
                maxWidth: `${size.maxWidth}px`,
                width: `${size.maxWidth}px`,
                ...(isPinnedLeft
                  ? { left: `${pinnedOffsets.leftOffsets[column.key] ?? 0}px` }
                  : {}),
                ...(isPinnedRight
                  ? {
                      right: `${pinnedOffsets.rightOffsets[column.key] ?? 0}px`,
                    }
                  : {}),
              }}
            >
              <div className="flex items-center gap-2">
                <span className="truncate">{column.label}</span>

                {column.isKey ? (
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    Key
                  </span>
                ) : null}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default DynamicTableHeader;
