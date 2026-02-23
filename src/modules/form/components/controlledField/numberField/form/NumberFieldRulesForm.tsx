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
import { Switch } from '@/common/libs/ui/switch';
import { Input } from '@/common/libs/ui/input';
import { NumericFormat } from 'react-number-format';
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import { NumberFieldValidationRulesWithMessage } from '../type/NumberFieldValidationRules';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import { applyTemplate } from '../../common/methods/common.methods';

type RuleMessageTemplate = string;

interface NumberFieldRulesFormValues {
  required: boolean;
  requiredMessage: RuleMessageTemplate;

  min?: number;
  minMessage: RuleMessageTemplate;

  max?: number;
  maxMessage: RuleMessageTemplate;
}

const DEFAULTS: NumberFieldRulesFormValues = {
  required: false,
  requiredMessage: 'Field is required',
  min: undefined,
  minMessage: 'Must be at least {min}',
  max: undefined,
  maxMessage: 'Cannot exceed {max}',
};

interface NumberFieldRulesFormProps {
  formFieldConfig: FormFieldConfigType;
}

const NumberFieldRulesForm: React.FC<NumberFieldRulesFormProps> = ({
  formFieldConfig,
}) => {
  const { updateField } = useDesigner();

  const form = useForm<NumberFieldRulesFormValues>({
    mode: 'onBlur',
    defaultValues: DEFAULTS,
  });

  const { control, handleSubmit } = form;

  useEffect(() => {
    if (formFieldConfig?.type !== FieldTypeEnum.InputTypeNumber) return;

    form.reset({
      required: !!formFieldConfig.rules.required?.value,
      requiredMessage:
        formFieldConfig.rules.required?.messageTemplate ??
        DEFAULTS.requiredMessage,

      min: formFieldConfig.rules.min?.value,
      minMessage:
        formFieldConfig.rules.min?.messageTemplate ?? DEFAULTS.minMessage,

      max: formFieldConfig.rules.max?.value,
      maxMessage:
        formFieldConfig.rules.max?.messageTemplate ?? DEFAULTS.maxMessage,
    });
  }, [formFieldConfig, form]);

  const cfgRef = useRef(formFieldConfig);
  useEffect(() => {
    cfgRef.current = formFieldConfig;
  }, [formFieldConfig]);

  const onSubmit = useCallback(
    (data: NumberFieldRulesFormValues) => {
      const min = data.min;
      const max = data.max;
      const maxMessageTemplate = data.maxMessage?.trim() || DEFAULTS.maxMessage;
      const minMessageTemplate = data.minMessage?.trim() || DEFAULTS.minMessage;

      const ruleUpdated: NumberFieldValidationRulesWithMessage = {
        required: data.required
          ? {
              value: true,
              message: data.requiredMessage?.trim() || DEFAULTS.requiredMessage,
              messageTemplate:
                data.requiredMessage.trim() || DEFAULTS.requiredMessage,
            }
          : undefined,

        min:
          min || min === 0
            ? {
                value: min,
                messageTemplate: minMessageTemplate,
                message: applyTemplate(minMessageTemplate, {
                  min: min,
                }),
              }
            : undefined,

        max:
          max || max === 0
            ? {
                value: max,
                messageTemplate: maxMessageTemplate,
                message: applyTemplate(maxMessageTemplate, {
                  max: max,
                }),
              }
            : undefined,
      };

      updateField(
        { ...cfgRef.current, rules: ruleUpdated },
        UpdatedTypeEnum.RuleForm
      );
    },
    [updateField]
  );

  // Save on unmount
  useEffect(() => {
    return () => onSubmit(form.getValues());
  }, [onSubmit, form]);

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeNumber) return null;

  return (
    <Form {...form}>
      <div onBlur={handleSubmit(onSubmit)} className="space-y-6">
        {/* REQUIRED */}
        <div className="rounded-md border p-3 space-y-3">
          <FormField
            control={control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <FormLabel>Required</FormLabel>
                  <FormDescription>
                    Mark if the field is required.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      form.setValue(field.name, !!checked)
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="requiredMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required message</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. This field is required"
                    disabled={!form.watch('required')}
                  />
                </FormControl>
                <FormDescription>
                  Message shown when the field is empty.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* MIN */}
        <div className="rounded-md border p-3 space-y-3">
          <FormField
            control={control}
            name="min"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min value</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    name={field.name}
                    disabled={field.disabled}
                    getInputRef={field.ref}
                    placeholder="e.g. 0"
                    onValueChange={(values) => {
                      form.setValue(field.name, values.floatValue);
                    }}
                    allowNegative
                    customInput={Input}
                  />
                </FormControl>
                <FormDescription>Minimum value allowed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="minMessage"
            render={({ field }) => {
              const min = form.watch('min');
              const preview = applyTemplate(field.value, {
                min: min ?? '{min}',
              });

              return (
                <FormItem>
                  <FormLabel>Min message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Must be at least {min}"
                      disabled={min === undefined}
                    />
                  </FormControl>
                  <FormDescription>
                    Use <code>{'{min}'}</code> to insert the configured value.
                    <span className="mt-1 block text-xs text-muted-foreground">
                      <strong>Preview</strong>:{' '}
                      <span className="font-medium">{preview}</span>
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {/* MAX */}
        <div className="rounded-md border p-3 space-y-3">
          <FormField
            control={control}
            name="max"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max value</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    name={field.name}
                    disabled={field.disabled}
                    getInputRef={field.ref}
                    placeholder="e.g. 100"
                    onValueChange={(values) => {
                      form.setValue(field.name, values.floatValue);
                    }}
                    allowNegative
                    customInput={Input}
                  />
                </FormControl>
                <FormDescription>Maximum value allowed.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="maxMessage"
            render={({ field }) => {
              const max = form.watch('max');
              const preview = applyTemplate(field.value, {
                max: max ?? '{max}',
              });

              return (
                <FormItem>
                  <FormLabel>Max message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Cannot exceed {max}"
                      disabled={max === undefined}
                    />
                  </FormControl>
                  <FormDescription>
                    Use <code>{'{max}'}</code> to insert the configured value.
                    <span className="mt-1 block text-xs text-muted-foreground">
                      <strong>Preview</strong>:{' '}
                      <span className="font-medium">{preview}</span>
                    </span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </div>
    </Form>
  );
};

export default NumberFieldRulesForm;
