import { useEffect, useRef, useState } from 'react';
import {
  DynamicTableColumnType,
  DynamicTablePinnedOffsetsType,
  DynamicTableRowType,
} from './dynamic-table.types';
import {
  formatCellValue,
  getAlignClass,
  getColumnSize,
  shouldTruncate,
} from './dynamic-table.utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';

type Props = {
  column: DynamicTableColumnType;
  row: DynamicTableRowType;
  value: unknown;
  pinnedOffsets: DynamicTablePinnedOffsetsType;
};

const DynamicTableCell = ({ column, row, value, pinnedOffsets }: Props) => {
  const size = getColumnSize(column);

  const customContent = column.renderCell?.({ value, row, column });
  const displayValue = customContent ?? formatCellValue(value);
  const truncate = shouldTruncate(column.questionTypeKey);

  const textRef = useRef<HTMLSpanElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const isPinnedLeft = column.pinned === 'left';
  const isPinnedRight = column.pinned === 'right';
  const isPinned = isPinnedLeft || isPinnedRight;

  useEffect(() => {
    const element = textRef.current;

    if (!element || !truncate) {
      setIsTruncated(false);
      return;
    }

    const checkTruncation = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    checkTruncation();

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [displayValue, truncate, size.maxWidth, size.minWidth]);

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
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild disabled={!isTruncated}>
            <span
              ref={textRef}
              className={
                truncate
                  ? 'block overflow-hidden text-ellipsis whitespace-nowrap'
                  : 'block whitespace-nowrap'
              }
              title={undefined}
            >
              {displayValue || '—'}
            </span>
          </TooltipTrigger>

          {isTruncated ? (
            <TooltipContent
              side="bottom"
              align={isPinnedRight ? 'end' : 'start'}
              className="max-w-[420px] whitespace-pre-wrap break-words"
            >
              {displayValue}
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
    </td>
  );
};

export default DynamicTableCell;
