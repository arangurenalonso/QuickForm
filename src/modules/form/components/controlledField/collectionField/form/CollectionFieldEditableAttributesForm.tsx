'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/common/libs/ui/button';
import { Input } from '@/common/libs/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/libs/ui/form';
import { Settings2 } from 'lucide-react';
import { FieldTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import { generateFieldElement } from '../../generateFieldElement';
import CollectionFieldEditableProps, {
  CollectionTableColumnConfig,
} from '../type/CollectionFieldEditableProps';
import { FieldEditorProps } from '../../common/type/FieldEditorProps';
import { syncCollectionTableColumns } from '../helper/collectionField.helpers';
import CollectionSubformBuilderModal from '../component/builder/CollectionSubformBuilderModal';

type CollectionFormFieldConfig = Extract<
  FormFieldConfigType,
  { type: FieldTypeEnum.Collection }
>;

/**
 * Important:
 * Do NOT include itemFields or tableColumns here.
 * React Hook Form computes deep field paths from this generic type,
 * and recursive arrays here make TS much harder to maintain.
 */
type CollectionFieldFormValues = {
  name: string;
  label: string;
  helperText: string;
  informationText: string;
  addButtonLabel: string;
  emptyStateText: string;
};

const getFormValues = (
  properties?: Partial<CollectionFieldEditableProps>
): CollectionFieldFormValues => ({
  name: properties?.name ?? '',
  label: properties?.label ?? '',
  helperText: properties?.helperText ?? '',
  informationText: properties?.informationText ?? '',
  addButtonLabel: properties?.addButtonLabel ?? 'Add item',
  emptyStateText: properties?.emptyStateText ?? 'No items added yet.',
});

const CollectionFieldEditableAttributesForm: React.FC<FieldEditorProps> = ({
  formFieldConfig,
  canEdit,
  onChange,
}) => {
  const form = useForm<CollectionFieldFormValues>({
    mode: 'onBlur',
    defaultValues: getFormValues(),
  });

  const [itemFields, setItemFields] = useState<FormFieldConfigType[]>([]);
  const [tableColumns, setTableColumns] = useState<
    CollectionTableColumnConfig[]
  >([]);
  const [selectedItemFieldId, setSelectedItemFieldId] = useState<string | null>(
    null
  );
  const [builderOpen, setBuilderOpen] = useState(false);

  const cfgRef = useRef<CollectionFormFieldConfig | null>(
    formFieldConfig.type === FieldTypeEnum.Collection
      ? (formFieldConfig as CollectionFormFieldConfig)
      : null
  );

  const itemFieldsRef = useRef<FormFieldConfigType[]>([]);
  const tableColumnsRef = useRef<CollectionTableColumnConfig[]>([]);

  useEffect(() => {
    cfgRef.current =
      formFieldConfig.type === FieldTypeEnum.Collection
        ? (formFieldConfig as CollectionFormFieldConfig)
        : null;
  }, [formFieldConfig]);

  useEffect(() => {
    itemFieldsRef.current = itemFields;
  }, [itemFields]);

  useEffect(() => {
    tableColumnsRef.current = tableColumns;
  }, [tableColumns]);

  useEffect(() => {
    if (formFieldConfig.type !== FieldTypeEnum.Collection) return;

    form.reset(getFormValues(formFieldConfig.properties));

    const incomingItemFields = formFieldConfig.properties.itemFields ?? [];
    const incomingTableColumns = syncCollectionTableColumns(
      incomingItemFields,
      formFieldConfig.properties.tableColumns ?? []
    );

    setItemFields(incomingItemFields);
    setTableColumns(incomingTableColumns);

    itemFieldsRef.current = incomingItemFields;
    tableColumnsRef.current = incomingTableColumns;

    setSelectedItemFieldId((prev) => {
      if (prev && incomingItemFields.some((field) => field.id === prev)) {
        return prev;
      }

      return incomingItemFields[0]?.id ?? null;
    });
  }, [formFieldConfig, form]);

  const persist = useCallback(
    (
      values?: CollectionFieldFormValues,
      nextItemFields?: FormFieldConfigType[],
      nextTableColumns?: CollectionTableColumnConfig[]
    ) => {
      const currentConfig = cfgRef.current;
      if (!currentConfig) return;

      const resolvedItemFields = nextItemFields ?? itemFieldsRef.current;
      const resolvedTableColumns = syncCollectionTableColumns(
        resolvedItemFields,
        nextTableColumns ?? tableColumnsRef.current
      );
      const currentValues = values ?? form.getValues();

      const updated: CollectionFormFieldConfig = {
        ...currentConfig,
        properties: {
          ...currentConfig.properties,
          ...currentValues,
          itemFields: resolvedItemFields,
          tableColumns: resolvedTableColumns,
        },
      };

      cfgRef.current = updated;
      itemFieldsRef.current = resolvedItemFields;
      tableColumnsRef.current = resolvedTableColumns;

      onChange(updated);
    },
    [form, onChange]
  );

  const handleCollectionInputBlur = useCallback(() => {
    void form.handleSubmit((data) => persist(data))();
  }, [form, persist]);

  const handleAddSubField = useCallback(
    (type: FieldTypeEnum) => {
      const newField = generateFieldElement(type);
      if (!newField) return;

      const nextItemFields = [...itemFieldsRef.current, newField];
      const nextTableColumns = syncCollectionTableColumns(
        nextItemFields,
        tableColumnsRef.current
      );

      itemFieldsRef.current = nextItemFields;
      tableColumnsRef.current = nextTableColumns;

      setItemFields(nextItemFields);
      setTableColumns(nextTableColumns);
      setSelectedItemFieldId(newField.id);

      persist(undefined, nextItemFields, nextTableColumns);
    },
    [persist]
  );

  const handleRemoveSubField = useCallback(
    (fieldId: string) => {
      const nextItemFields = itemFieldsRef.current.filter(
        (field) => field.id !== fieldId
      );
      const nextTableColumns = syncCollectionTableColumns(
        nextItemFields,
        tableColumnsRef.current
      );

      itemFieldsRef.current = nextItemFields;
      tableColumnsRef.current = nextTableColumns;

      setItemFields(nextItemFields);
      setTableColumns(nextTableColumns);
      setSelectedItemFieldId((currentSelected) => {
        if (currentSelected !== fieldId) return currentSelected;
        return nextItemFields[0]?.id ?? null;
      });

      persist(undefined, nextItemFields, nextTableColumns);
    },
    [persist]
  );

  const handleSubFieldChange = useCallback(
    (updatedField: FormFieldConfigType) => {
      const nextItemFields = itemFieldsRef.current.map((field) =>
        field.id === updatedField.id ? updatedField : field
      );

      itemFieldsRef.current = nextItemFields;
      setItemFields(nextItemFields);

      persist(undefined, nextItemFields, tableColumnsRef.current);
    },
    [persist]
  );

  const handleReorderSubFields = useCallback(
    (nextItemFields: FormFieldConfigType[]) => {
      const nextTableColumns = syncCollectionTableColumns(
        nextItemFields,
        tableColumnsRef.current
      );

      itemFieldsRef.current = nextItemFields;
      tableColumnsRef.current = nextTableColumns;

      setItemFields(nextItemFields);
      setTableColumns(nextTableColumns);

      persist(undefined, nextItemFields, nextTableColumns);
    },
    [persist]
  );

  const handleToggleColumnVisibility = useCallback(
    (fieldId: string) => {
      const nextTableColumns = tableColumnsRef.current.map((column) =>
        column.fieldId === fieldId
          ? { ...column, visible: !column.visible }
          : column
      );

      tableColumnsRef.current = nextTableColumns;
      setTableColumns(nextTableColumns);

      persist(undefined, itemFieldsRef.current, nextTableColumns);
    },
    [persist]
  );

  const handleReorderColumns = useCallback(
    (nextTableColumns: CollectionTableColumnConfig[]) => {
      tableColumnsRef.current = nextTableColumns;
      setTableColumns(nextTableColumns);

      persist(undefined, itemFieldsRef.current, nextTableColumns);
    },
    [persist]
  );

  if (formFieldConfig.type !== FieldTypeEnum.Collection) return null;

  return (
    <>
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="contacts"
                    disabled={!canEdit}
                    onBlur={() => {
                      field.onBlur();
                      handleCollectionInputBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Contacts"
                    disabled={!canEdit}
                    onBlur={() => {
                      field.onBlur();
                      handleCollectionInputBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper text</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Add one or more contacts."
                    disabled={!canEdit}
                    onBlur={() => {
                      field.onBlur();
                      handleCollectionInputBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="informationText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Information text</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Each row is created from a modal subform."
                    disabled={!canEdit}
                    onBlur={() => {
                      field.onBlur();
                      handleCollectionInputBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addButtonLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add button label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Add item"
                    disabled={!canEdit}
                    onBlur={() => {
                      field.onBlur();
                      handleCollectionInputBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emptyStateText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empty state text</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="No items added yet."
                    disabled={!canEdit}
                    onBlur={() => {
                      field.onBlur();
                      handleCollectionInputBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="rounded-xl border bg-background p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold">Subform builder</div>
                <div className="text-xs text-muted-foreground">
                  Open a full-screen experience to build the subform with drag
                  and drop and configure the visible table columns.
                </div>
              </div>

              <Button
                type="button"
                disabled={!canEdit}
                onClick={() => setBuilderOpen(true)}
                className="gap-2"
              >
                <Settings2 className="h-4 w-4" />
                Configure subform
              </Button>
            </div>
          </div>
        </div>
      </Form>

      <CollectionSubformBuilderModal
        open={builderOpen}
        onOpenChange={setBuilderOpen}
        canEdit={canEdit}
        itemFields={itemFields}
        tableColumns={tableColumns}
        selectedItemFieldId={selectedItemFieldId}
        onSelectField={setSelectedItemFieldId}
        onAddField={handleAddSubField}
        onRemoveField={handleRemoveSubField}
        onReorderFields={handleReorderSubFields}
        onFieldChange={handleSubFieldChange}
        onToggleColumnVisibility={handleToggleColumnVisibility}
        onReorderColumns={handleReorderColumns}
      />
    </>
  );
};

export default CollectionFieldEditableAttributesForm;
