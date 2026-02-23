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
import { TextFieldValidationRulesWithMessage } from '../type/TextFieldValidationRules';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import { applyTemplate } from '../../common/methods/common.methods';
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';

type TextRuleMessageTemplate = string;

interface TextFieldRulesFormValues {
  required: boolean;
  requiredMessage: TextRuleMessageTemplate;

  minLength?: number;
  minLengthMessage: TextRuleMessageTemplate;

  maxLength?: number;
  maxLengthMessage: TextRuleMessageTemplate;
}

const DEFAULTS: TextFieldRulesFormValues = {
  required: false,
  requiredMessage: 'Field is required',
  minLength: undefined,
  minLengthMessage: 'Minimum length is {minLength}',
  maxLength: undefined,
  maxLengthMessage: 'Maximum length is {maxLength}',
};

interface TextFieldRulesFormProps {
  formFieldConfig: FormFieldConfigType;
}

const TextFieldRulesForm: React.FC<TextFieldRulesFormProps> = ({
  formFieldConfig,
}) => {
  const { updateField } = useDesigner();

  const form = useForm<TextFieldRulesFormValues>({
    mode: 'onBlur',
    defaultValues: DEFAULTS,
  });

  useEffect(() => {
    if (formFieldConfig?.type !== FieldTypeEnum.InputTypeText) return;
    const resetValue = {
      required: !!formFieldConfig.rules.required?.value,
      requiredMessage:
        formFieldConfig.rules.required?.messageTemplate ??
        DEFAULTS.requiredMessage,

      minLength: formFieldConfig.rules.minLength?.value,
      minLengthMessage:
        formFieldConfig.rules.minLength?.messageTemplate ??
        DEFAULTS.minLengthMessage,

      maxLength: formFieldConfig.rules.maxLength?.value,
      maxLengthMessage:
        formFieldConfig.rules.maxLength?.messageTemplate ??
        DEFAULTS.maxLengthMessage,
    };
    form.reset(resetValue);
  }, [formFieldConfig, form]);

  const cfgRef = useRef(formFieldConfig);
  useEffect(() => {
    cfgRef.current = formFieldConfig;
  }, [formFieldConfig]);

  const onSubmit = useCallback(
    (data: TextFieldRulesFormValues) => {
      const minLength = data.minLength;
      const maxLength = data.maxLength;
      const required = data.required;
      const minLengthMessageTemplate =
        data.minLengthMessage?.trim() || DEFAULTS.minLengthMessage;
      const maxLengthMessageTemplate =
        data.maxLengthMessage.trim() || DEFAULTS.maxLengthMessage;
      const requiredMessageTemplate =
        data.requiredMessage?.trim() || DEFAULTS.requiredMessage;

      const ruleUpdated: TextFieldValidationRulesWithMessage = {
        required: required
          ? {
              value: true,
              messageTemplate: requiredMessageTemplate,
              message: requiredMessageTemplate,
            }
          : undefined,

        minLength:
          minLength || minLength === 0
            ? {
                value: minLength,
                messageTemplate: minLengthMessageTemplate,
                message: applyTemplate(minLengthMessageTemplate, {
                  minLength: minLength,
                }),
              }
            : undefined,

        maxLength:
          maxLength || maxLength === 0
            ? {
                value: maxLength,
                messageTemplate: maxLengthMessageTemplate,
                message: applyTemplate(maxLengthMessageTemplate, {
                  maxLength: maxLength,
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

  // Guardar al desmontar
  useEffect(() => {
    return () => onSubmit(form.getValues());
  }, [onSubmit, form]);

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeText) return null;

  return (
    <Form {...form}>
      <div onBlur={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* REQUIRED */}
        <div className="rounded-md border p-3 space-y-3">
          <FormField
            control={form.control}
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
            control={form.control}
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

        {/* MIN LENGTH */}
        <div className="rounded-md border p-3 space-y-3">
          <FormField
            control={form.control}
            name="minLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min length</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    name={field.name}
                    disabled={field.disabled}
                    getInputRef={field.ref}
                    placeholder="e.g. 3"
                    onValueChange={(values) => {
                      form.setValue(field.name, values.floatValue);
                    }}
                    allowNegative={false}
                    customInput={Input}
                  />
                </FormControl>
                <FormDescription>
                  Minimum number of characters required.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minLengthMessage"
            render={({ field }) => {
              const minLength = form.watch('minLength');
              const preview = applyTemplate(field.value, {
                minLength: minLength ?? '{minLength}',
              });

              return (
                <FormItem>
                  <FormLabel>Min length message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Minimum length is {minLength}"
                      disabled={minLength === undefined}
                    />
                  </FormControl>
                  <FormDescription>
                    Use <code>{'{minLength}'}</code> to insert the configured
                    value.
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

        {/* MAX LENGTH */}
        <div className="rounded-md border p-3 space-y-3">
          <FormField
            control={form.control}
            name="maxLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max length</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    name={field.name}
                    disabled={field.disabled}
                    getInputRef={field.ref}
                    placeholder="e.g. 50"
                    onValueChange={(values) => {
                      form.setValue(field.name, values.floatValue);
                    }}
                    allowNegative={false}
                    customInput={Input}
                  />
                </FormControl>
                <FormDescription>
                  Maximum number of characters allowed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxLengthMessage"
            render={({ field }) => {
              const maxLength = form.watch('maxLength');
              const preview = applyTemplate(field.value, {
                maxLength: maxLength ?? '{maxLength}',
              });

              return (
                <FormItem>
                  <FormLabel>Max length message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Maximum length is {maxLength}"
                      disabled={maxLength === undefined}
                    />
                  </FormControl>
                  <FormDescription>
                    Use <code>{'{maxLength}'}</code> to insert the configured
                    value.
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

export default TextFieldRulesForm;
