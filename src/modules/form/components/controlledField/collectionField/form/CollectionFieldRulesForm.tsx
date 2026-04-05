'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/libs/ui/form';
import { Input } from '@/common/libs/ui/input';
import { Switch } from '@/common/libs/ui/switch';
import { NumericFormat } from 'react-number-format';
import { FieldTypeEnum } from '../../common/enum/FieldType';
import { FieldEditorProps } from '../../common/type/FieldEditorProps';
import { CollectionFieldValidationRulesWithMessage } from '../type/CollectionFieldValidationRulesBase';
import { applyTemplate } from '../../common/methods/common.methods';

type FormValues = {
  required: boolean;
  requiredMessage: string;
  minItems?: number;
  minItemsMessage: string;
  maxItems?: number;
  maxItemsMessage: string;
};

const DEFAULTS: FormValues = {
  required: false,
  requiredMessage: 'At least one item is required',
  minItems: undefined,
  minItemsMessage: 'Minimum {minItems} items required',
  maxItems: undefined,
  maxItemsMessage: 'Maximum {maxItems} items allowed',
};

const CollectionFieldRulesForm: React.FC<FieldEditorProps> = ({
  formFieldConfig,
  canEdit,
  onChange,
}) => {
  const form = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: DEFAULTS,
  });

  useEffect(() => {
    if (formFieldConfig.type !== FieldTypeEnum.Collection) return;

    form.reset({
      required: !!formFieldConfig.rules.required?.value,
      requiredMessage:
        formFieldConfig.rules.required?.messageTemplate ??
        DEFAULTS.requiredMessage,
      minItems: formFieldConfig.rules.minItems?.value,
      minItemsMessage:
        formFieldConfig.rules.minItems?.messageTemplate ??
        DEFAULTS.minItemsMessage,
      maxItems: formFieldConfig.rules.maxItems?.value,
      maxItemsMessage:
        formFieldConfig.rules.maxItems?.messageTemplate ??
        DEFAULTS.maxItemsMessage,
    });
  }, [formFieldConfig, form]);

  const cfgRef = useRef(formFieldConfig);
  useEffect(() => {
    cfgRef.current = formFieldConfig;
  }, [formFieldConfig]);

  const submit = useCallback(
    (data: FormValues) => {
      const rules: CollectionFieldValidationRulesWithMessage = {
        required: data.required
          ? {
              value: true,
              messageTemplate: data.requiredMessage,
              message: data.requiredMessage,
            }
          : undefined,

        minItems:
          data.minItems || data.minItems === 0
            ? {
                value: data.minItems,
                messageTemplate: data.minItemsMessage,
                message: applyTemplate(data.minItemsMessage, {
                  minItems: data.minItems,
                }),
              }
            : undefined,

        maxItems:
          data.maxItems || data.maxItems === 0
            ? {
                value: data.maxItems,
                messageTemplate: data.maxItemsMessage,
                message: applyTemplate(data.maxItemsMessage, {
                  maxItems: data.maxItems,
                }),
              }
            : undefined,
      };

      onChange({ ...cfgRef.current, rules });
    },
    [onChange]
  );

  if (formFieldConfig.type !== FieldTypeEnum.Collection) return null;

  return (
    <Form {...form}>
      <div onBlur={form.handleSubmit(submit)} className="space-y-4">
        <FormField
          control={form.control}
          disabled={!canEdit}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-4">
              <div>
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Require at least one collection item.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={!canEdit}
          name="minItems"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min items</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) =>
                    field.onChange(values.floatValue ?? undefined)
                  }
                  allowNegative={false}
                  decimalScale={0}
                  customInput={Input}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={!canEdit}
          name="maxItems"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max items</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  onValueChange={(values) =>
                    field.onChange(values.floatValue ?? undefined)
                  }
                  allowNegative={false}
                  decimalScale={0}
                  customInput={Input}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default CollectionFieldRulesForm;
