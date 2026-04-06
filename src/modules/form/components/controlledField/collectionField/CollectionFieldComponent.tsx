'use client';

import { Button } from '@/common/libs/ui/button';
import { cn } from '@/common/libs/utils';
import CollectionFieldEditableProps from './type/CollectionFieldEditableProps';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/common/libs/ui/tooltip';
import { getCollectionVisibleColumns } from './helper/collectionField.helpers';

type Props = CollectionFieldEditableProps & {
  required?: boolean;
};

const CollectionFieldComponent = ({
  label,
  helperText,
  informationText,
  addButtonLabel = 'Add item',
  emptyStateText = 'No items added yet.',
  itemFields,
  tableColumns,
}: Props) => {
  const visibleColumns = getCollectionVisibleColumns(itemFields, tableColumns);

  return (
    <div className="space-y-3">
      {(label || informationText) && (
        <div className="flex items-center gap-2">
          {label && <label className="text-sm font-medium">{label}</label>}
          {informationText && (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-muted-foreground">
                    <Info className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{informationText}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      <div className="rounded-md border bg-background">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-sm font-medium">Items</span>
          <Button type="button" size="sm" disabled>
            {addButtonLabel}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {visibleColumns.map((field) => (
                  <th
                    key={field.id}
                    className="px-3 py-2 text-left font-medium text-muted-foreground"
                  >
                    {field.properties.label || field.properties.name}
                  </th>
                ))}
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={visibleColumns.length + 1}
                  className={cn('px-3 py-6 text-center text-muted-foreground')}
                >
                  {emptyStateText}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p className="min-h-[1rem] text-xs text-muted-foreground">
        {helperText || '\u00A0'}
      </p>
    </div>
  );
};

export default CollectionFieldComponent;
