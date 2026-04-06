import type { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import type { CollectionTableColumnConfig } from '../type/CollectionFieldEditableProps';

export const syncCollectionTableColumns = (
  itemFields: FormFieldConfigType[],
  currentColumns: CollectionTableColumnConfig[]
): CollectionTableColumnConfig[] => {
  const currentMap = new Map(
    currentColumns.map((column) => [column.fieldId, column])
  );

  return itemFields.map((field) => {
    const existing = currentMap.get(field.id);

    return (
      existing ?? {
        fieldId: field.id,
        visible: true,
      }
    );
  });
};

export const getCollectionVisibleColumns = (
  itemFields: FormFieldConfigType[],
  tableColumns: CollectionTableColumnConfig[]
): FormFieldConfigType[] => {
  const syncedColumns = syncCollectionTableColumns(itemFields, tableColumns);
  const fieldsMap = new Map(itemFields.map((field) => [field.id, field]));

  return syncedColumns
    .filter((column) => column.visible)
    .map((column) => fieldsMap.get(column.fieldId))
    .filter((field): field is FormFieldConfigType => !!field);
};

export const reorderByIds = <T extends { id: string }>(
  items: T[],
  orderedIds: string[]
): T[] => {
  const itemsMap = new Map(items.map((item) => [item.id, item]));
  return orderedIds
    .map((id) => itemsMap.get(id))
    .filter((item): item is T => !!item);
};
