'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormWatch,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Button } from '@/common/libs/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common/libs/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';
import CollectionFieldEditableProps from '../type/CollectionFieldEditableProps';
import CollectionItemFieldsRenderer from '../component/CollectionItemFieldsRenderer';
import { getCollectionVisibleColumns } from '../helper/collectionField.helpers';

type Props<T extends FieldValues> = {
  name: ArrayPath<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  control?: Control<T>;
  watch?: UseFormWatch<T>;
  disabled?: boolean;
};

type ItemFormValues = Record<string, unknown>;

const buildDefaultItem = (
  itemFields: CollectionFieldEditableProps['itemFields']
): ItemFormValues => {
  const result: ItemFormValues = {};

  for (const field of itemFields) {
    switch (field.type) {
      case 'InputTypeText':
        result[field.properties.name] = '';
        break;
      case 'InputTypeInteger':
      case 'InputTypeDecimal':
        result[field.properties.name] = undefined;
        break;
      default:
        result[field.properties.name] = undefined;
        break;
    }
  }

  return result;
};

const CollectionFieldControlled = <T extends FieldValues>({
  name,
  control,
  watch,
  disabled,
  label,
  helperText = ' ',
  addButtonLabel = 'Add item',
  emptyStateText = 'No items added yet.',
  itemFields,
  tableColumns,
}: Props<T> & CollectionFieldEditableProps) => {
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const itemForm = useForm<ItemFormValues>({
    mode: 'onBlur',
    defaultValues: buildDefaultItem(itemFields),
  });

  const safeControl = control as Control<T>;

  const { fields, append, remove, update } = useFieldArray<T, ArrayPath<T>>({
    control: safeControl,
    name,
  });

  const visibleColumns = useMemo(
    () => getCollectionVisibleColumns(itemFields, tableColumns),
    [itemFields, tableColumns]
  );

  const currentEditingItem = useMemo(() => {
    if (editingIndex === null) return null;
    return fields[editingIndex] as unknown as ItemFormValues;
  }, [editingIndex, fields]);

  useEffect(() => {
    if (!open) return;

    if (currentEditingItem) {
      itemForm.reset(currentEditingItem);
      return;
    }

    itemForm.reset(buildDefaultItem(itemFields));
  }, [open, currentEditingItem, itemForm, itemFields]);

  if (!control || !watch) return null;

  const handleAdd = () => {
    setEditingIndex(null);
    setOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleSave = itemForm.handleSubmit((data) => {
    const item = data as FieldArray<T, ArrayPath<T>>;

    if (editingIndex === null) {
      append(item);
    } else {
      update(editingIndex, item);
    }

    setOpen(false);
    setEditingIndex(null);
  });

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="rounded-md border bg-background">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-sm font-medium">Items</span>
          <Button
            type="button"
            size="sm"
            onClick={handleAdd}
            disabled={disabled}
          >
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
              {fields.length === 0 && (
                <tr>
                  <td
                    colSpan={visibleColumns.length + 1}
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    {emptyStateText}
                  </td>
                </tr>
              )}

              {fields.map((row, index) => (
                <tr key={row.id} className="border-b last:border-b-0">
                  {visibleColumns.map((field) => {
                    const value = (row as Record<string, unknown>)[
                      field.properties.name
                    ];

                    return (
                      <td key={field.id} className="px-3 py-2">
                        {String(value ?? '')}
                      </td>
                    );
                  })}

                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(index)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="min-h-[1rem] text-xs text-muted-foreground">
        {helperText || '\u00A0'}
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(960px,calc(100vw-2rem))] max-w-none">
          <DialogHeader>
            <DialogTitle>
              {editingIndex === null ? 'Add item' : 'Edit item'}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[75vh] overflow-y-auto py-2">
            <CollectionItemFieldsRenderer
              itemFields={itemFields}
              control={itemForm.control}
              watch={itemForm.watch}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setOpen(false);
                setEditingIndex(null);
              }}
            >
              Cancel
            </Button>

            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollectionFieldControlled;
