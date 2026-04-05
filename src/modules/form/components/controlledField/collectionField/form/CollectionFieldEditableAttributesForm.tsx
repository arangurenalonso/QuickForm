'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType } from 'react';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/common/libs/ui/tabs';
import { Trash2 } from 'lucide-react';
import { FieldTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import { generateFieldElement } from '../../generateFieldElement';
import CollectionFieldEditableProps from '../type/CollectionFieldEditableProps';
import { FieldEditorProps } from '../../common/type/FieldEditorProps';

type CollectionFormFieldConfig = Extract<
  FormFieldConfigType,
  { type: FieldTypeEnum.Collection }
>;

/**
 * Important:
 * Do NOT include itemFields here.
 * React Hook Form computes deep field paths from this generic type,
 * and itemFields -> FormFieldConfigType[] becomes recursive.
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
  const [selectedItemFieldId, setSelectedItemFieldId] = useState<string | null>(
    null
  );

  const cfgRef = useRef<CollectionFormFieldConfig | null>(
    formFieldConfig.type === FieldTypeEnum.Collection
      ? (formFieldConfig as CollectionFormFieldConfig)
      : null
  );

  const itemFieldsRef = useRef<FormFieldConfigType[]>([]);

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
    if (formFieldConfig.type !== FieldTypeEnum.Collection) return;

    form.reset(getFormValues(formFieldConfig.properties));

    const incomingItemFields = formFieldConfig.properties.itemFields ?? [];
    setItemFields(incomingItemFields);
    itemFieldsRef.current = incomingItemFields;

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
      nextItemFields?: FormFieldConfigType[]
    ) => {
      const currentConfig = cfgRef.current;
      if (!currentConfig) return;

      const resolvedItemFields = nextItemFields ?? itemFieldsRef.current;
      const currentValues = values ?? form.getValues();

      const updated: CollectionFormFieldConfig = {
        ...currentConfig,
        properties: {
          ...currentConfig.properties,
          ...currentValues,
          itemFields: resolvedItemFields,
        },
      };

      cfgRef.current = updated;
      itemFieldsRef.current = resolvedItemFields;

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

      setItemFields((prev) => {
        const next = [...prev, newField];
        itemFieldsRef.current = next;
        persist(undefined, next);
        return next;
      });

      setSelectedItemFieldId(newField.id);
    },
    [persist]
  );

  const handleRemoveSubField = useCallback(
    (fieldId: string) => {
      setItemFields((prev) => {
        const next = prev.filter((field) => field.id !== fieldId);
        itemFieldsRef.current = next;
        persist(undefined, next);

        setSelectedItemFieldId((currentSelected) => {
          if (currentSelected !== fieldId) return currentSelected;
          return next[0]?.id ?? null;
        });

        return next;
      });
    },
    [persist]
  );

  const handleSubFieldChange = useCallback(
    (updatedField: FormFieldConfigType) => {
      setItemFields((prev) => {
        const next = prev.map((field) =>
          field.id === updatedField.id ? updatedField : field
        );

        itemFieldsRef.current = next;
        persist(undefined, next);
        return next;
      });
    },
    [persist]
  );

  const selectedItemField = useMemo(() => {
    return itemFields.find((field) => field.id === selectedItemFieldId) ?? null;
  }, [itemFields, selectedItemFieldId]);

  if (formFieldConfig.type !== FieldTypeEnum.Collection) return null;

  const selectedEditorField = selectedItemField as FormFieldConfigType | null;

  const EditablePropsForm = selectedItemField?.render.EditablePropsForm as
    | ComponentType<FieldEditorProps>
    | undefined;

  const RulesForm = selectedItemField?.render.RulesForm as
    | ComponentType<FieldEditorProps>
    | undefined;

  return (
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

        <div className="space-y-4 rounded-md border p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={!canEdit}
              onClick={() => handleAddSubField(FieldTypeEnum.InputTypeText)}
            >
              Add Text
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={!canEdit}
              onClick={() => handleAddSubField(FieldTypeEnum.InputTypeInteger)}
            >
              Add Integer
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={!canEdit}
              onClick={() => handleAddSubField(FieldTypeEnum.InputTypeDecimal)}
            >
              Add Decimal
            </Button>
          </div>

          <div className="space-y-2">
            {itemFields.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <button
                  type="button"
                  className="text-left"
                  onClick={() => setSelectedItemFieldId(field.id)}
                >
                  <div className="font-medium">
                    {field.properties.label || field.properties.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {field.type}
                  </div>
                </button>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={!canEdit}
                  onClick={() => handleRemoveSubField(field.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {selectedEditorField && EditablePropsForm && RulesForm && (
            <Tabs defaultValue="properties" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
              </TabsList>

              <TabsContent value="properties">
                <EditablePropsForm
                  formFieldConfig={selectedEditorField}
                  canEdit={canEdit}
                  onChange={handleSubFieldChange}
                />
              </TabsContent>

              <TabsContent value="rules">
                <RulesForm
                  formFieldConfig={selectedEditorField}
                  canEdit={canEdit}
                  onChange={handleSubFieldChange}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </Form>
  );
};

export default CollectionFieldEditableAttributesForm;
