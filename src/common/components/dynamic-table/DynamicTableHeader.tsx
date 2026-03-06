import { DynamicTableColumnType } from './dynamic-table.types';
import { getAlignClass, getColumnSize } from './dynamic-table.utils';

type DynamicTableHeaderProps = {
  columns: DynamicTableColumnType[];
};

const DynamicTableHeader = ({ columns }: DynamicTableHeaderProps) => {
  return (
    <thead className="sticky top-0 z-10 bg-slate-50">
      <tr>
        {columns.map((column) => {
          const size = getColumnSize(column);

          return (
            <th
              key={column.key}
              className={[
                'border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600',
                getAlignClass(size.align),
                column.isKey ? 'sticky left-0 z-20 bg-slate-50' : '',
              ].join(' ')}
              style={{
                minWidth: `${size.minWidth}px`,
                maxWidth: `${size.maxWidth}px`,
                width: `${size.maxWidth}px`,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="truncate">{column.label}</span>
                {column.isKey ? (
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-700">
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
