'use client';

import { ComponentType, useMemo } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/common/libs/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/common/libs/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';
import { Switch } from '@/common/libs/ui/switch';
import { cn } from '@/common/libs/utils';
import {
  Eye,
  EyeOff,
  GripVertical,
  Plus,
  Rows3,
  Trash2,
  Type,
} from 'lucide-react';
import { MdNumbers } from 'react-icons/md';
import { TbDecimal } from 'react-icons/tb';
import { CollectionTableColumnConfig } from '../../type/CollectionFieldEditableProps';
import { FieldTypeEnum } from '../../../common/enum/FieldType';
import { FormFieldConfigType } from '../../../common/enum/FormFieldConfigType';
import { FieldEditorProps } from '../../../common/type/FieldEditorProps';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canEdit: boolean;
  itemFields: FormFieldConfigType[];
  tableColumns: CollectionTableColumnConfig[];
  selectedItemFieldId: string | null;
  onSelectField: (fieldId: string | null) => void;
  onAddField: (type: FieldTypeEnum) => void;
  onRemoveField: (fieldId: string) => void;
  onReorderFields: (nextFields: FormFieldConfigType[]) => void;
  onFieldChange: (updatedField: FormFieldConfigType) => void;
  onToggleColumnVisibility: (fieldId: string) => void;
  onReorderColumns: (nextColumns: CollectionTableColumnConfig[]) => void;
};

type SortableFieldRowProps = {
  field: FormFieldConfigType;
  isSelected: boolean;
  disabled: boolean;
  onSelect: () => void;
  onRemove: () => void;
};

type SortableColumnRowProps = {
  column: CollectionTableColumnConfig;
  field: FormFieldConfigType | undefined;
  disabled: boolean;
  onToggleVisible: () => void;
};

const FIELD_TYPE_ICON: Record<FieldTypeEnum, React.ReactNode> = {
  [FieldTypeEnum.InputTypeText]: <Type className="h-4 w-4" />,
  [FieldTypeEnum.InputTypeInteger]: <MdNumbers className="h-4 w-4" />,
  [FieldTypeEnum.InputTypeDecimal]: <TbDecimal className="h-4 w-4" />,
  [FieldTypeEnum.Collection]: <Rows3 className="h-4 w-4" />,
};

const SortableFieldRow = ({
  field,
  isSelected,
  disabled,
  onSelect,
  onRemove,
}: SortableFieldRowProps) => {
  const sortable = useSortable({
    id: field.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className={cn(
        'rounded-xl border bg-background transition-colors',
        isSelected && 'border-primary ring-2 ring-primary/20',
        sortable.isDragging && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          className="cursor-grab text-muted-foreground disabled:cursor-not-allowed"
          {...sortable.attributes}
          {...sortable.listeners}
          disabled={disabled}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onSelect}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/40">
            {FIELD_TYPE_ICON[field.type]}
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-medium">
              {field.properties.label || field.properties.name}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {field.type}
            </div>
          </div>
        </button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={disabled}
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const SortableColumnRow = ({
  column,
  field,
  disabled,
  onToggleVisible,
}: SortableColumnRowProps) => {
  const sortable = useSortable({
    id: column.fieldId,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition,
  };

  return (
    <div
      ref={sortable.setNodeRef}
      style={style}
      className={cn(
        'rounded-xl border bg-background p-3',
        sortable.isDragging && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="cursor-grab text-muted-foreground disabled:cursor-not-allowed"
          {...sortable.attributes}
          {...sortable.listeners}
          disabled={disabled}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">
            {field?.properties.label ||
              field?.properties.name ||
              column.fieldId}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {field?.type ?? 'Unknown field'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {column.visible ? (
            <Eye className="h-4 w-4 text-muted-foreground" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}

          <Switch
            checked={column.visible}
            disabled={disabled}
            onCheckedChange={onToggleVisible}
          />
        </div>
      </div>
    </div>
  );
};

const CollectionSubformBuilderModal = ({
  open,
  onOpenChange,
  canEdit,
  itemFields,
  tableColumns,
  selectedItemFieldId,
  onSelectField,
  onAddField,
  onRemoveField,
  onReorderFields,
  onFieldChange,
  onToggleColumnVisibility,
  onReorderColumns,
}: Props) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    })
  );

  const selectedItemField = useMemo(
    () => itemFields.find((field) => field.id === selectedItemFieldId) ?? null,
    [itemFields, selectedItemFieldId]
  );

  const EditablePropsForm = selectedItemField?.render.EditablePropsForm as
    | ComponentType<FieldEditorProps>
    | undefined;

  const RulesForm = selectedItemField?.render.RulesForm as
    | ComponentType<FieldEditorProps>
    | undefined;

  const fieldIds = itemFields.map((field) => field.id);
  const columnIds = tableColumns.map((column) => column.fieldId);

  const handleFieldsDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = fieldIds.findIndex((id) => id === String(active.id));
    const newIndex = fieldIds.findIndex((id) => id === String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    onReorderFields(arrayMove(itemFields, oldIndex, newIndex));
  };

  const handleColumnsDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = columnIds.findIndex((id) => id === String(active.id));
    const newIndex = columnIds.findIndex((id) => id === String(over.id));

    if (oldIndex === -1 || newIndex === -1) return;

    onReorderColumns(arrayMove(tableColumns, oldIndex, newIndex));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen w-screen max-w-none rounded-none p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Subform builder</DialogTitle>
          <DialogDescription>
            Define the fields of the subform, reorder them with drag and drop,
            and decide which ones should appear as visible columns in the table.
          </DialogDescription>
        </DialogHeader>

        <div className="grid h-[calc(100vh-89px)] grid-cols-[260px_minmax(0,1fr)_420px] overflow-hidden">
          <aside className="border-r bg-muted/20 p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Field palette</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Add the fields available inside the collection subform.
              </p>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!canEdit}
                onClick={() => onAddField(FieldTypeEnum.InputTypeText)}
              >
                <Plus className="h-4 w-4" />
                Add Text
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!canEdit}
                onClick={() => onAddField(FieldTypeEnum.InputTypeInteger)}
              >
                <Plus className="h-4 w-4" />
                Add Integer
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={!canEdit}
                onClick={() => onAddField(FieldTypeEnum.InputTypeDecimal)}
              >
                <Plus className="h-4 w-4" />
                Add Decimal
              </Button>
            </div>
          </aside>

          <section className="overflow-hidden p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Subform fields</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Reorder the fields the user will complete inside each row item.
              </p>
            </div>

            <div className="h-[calc(100%-44px)] overflow-y-auto pr-2">
              {itemFields.length === 0 ? (
                <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Add the first subform field from the left panel.
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleFieldsDragEnd}
                >
                  <SortableContext
                    items={fieldIds}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {itemFields.map((field) => (
                        <SortableFieldRow
                          key={field.id}
                          field={field}
                          isSelected={selectedItemFieldId === field.id}
                          disabled={!canEdit}
                          onSelect={() => onSelectField(field.id)}
                          onRemove={() => onRemoveField(field.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </section>

          <aside className="flex min-h-0 flex-col border-l bg-muted/10">
            <div className="border-b px-4 py-4">
              <h3 className="text-sm font-semibold">Inspector</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Edit the selected field and define the table columns.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selectedItemField && EditablePropsForm && RulesForm ? (
                <Tabs defaultValue="properties" className="w-full">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="properties" className="flex-1">
                      Properties
                    </TabsTrigger>
                    <TabsTrigger value="rules" className="flex-1">
                      Rules
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="properties">
                    <EditablePropsForm
                      formFieldConfig={selectedItemField}
                      canEdit={canEdit}
                      onChange={onFieldChange}
                    />
                  </TabsContent>

                  <TabsContent value="rules">
                    <RulesForm
                      formFieldConfig={selectedItemField}
                      canEdit={canEdit}
                      onChange={onFieldChange}
                    />
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                  Select a subform field to edit its properties and rules.
                </div>
              )}

              <div className="my-6 border-t" />

              <div>
                <h3 className="text-sm font-semibold">Table columns</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Toggle visibility and reorder the columns shown in the table.
                </p>
              </div>

              <div className="mt-4">
                {tableColumns.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                    Add subform fields first to configure the table columns.
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleColumnsDragEnd}
                  >
                    <SortableContext
                      items={columnIds}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3">
                        {tableColumns.map((column) => {
                          const field = itemFields.find(
                            (itemField) => itemField.id === column.fieldId
                          );

                          return (
                            <SortableColumnRow
                              key={column.fieldId}
                              column={column}
                              field={field}
                              disabled={!canEdit}
                              onToggleVisible={() =>
                                onToggleColumnVisibility(column.fieldId)
                              }
                            />
                          );
                        })}
                      </div>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionSubformBuilderModal;
