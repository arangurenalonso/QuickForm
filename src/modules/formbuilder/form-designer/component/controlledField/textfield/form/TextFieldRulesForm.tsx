import { useEffect } from 'react';
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
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { TextFieldValidationRulesWithMessage } from '../type/TextFieldValidationRules';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';
import { applyTemplate } from '../../common/methods/common.methods';

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
  minLengthMessage: 'Minimum length is {min}',
  maxLength: undefined,
  maxLengthMessage: 'Maximum length is {max}',
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

  // Cargar valores desde config
  useEffect(() => {
    if (formFieldConfig?.type !== FieldTypeEnum.InputTypeText) return;
    const resetValue = {
      required: !!formFieldConfig.rules.required?.value,
      requiredMessage:
        formFieldConfig.rules.required?.message ?? DEFAULTS.requiredMessage,

      minLength: formFieldConfig.rules.minLength?.value,
      minLengthMessage:
        formFieldConfig.rules.minLength?.message ?? DEFAULTS.minLengthMessage,

      maxLength: formFieldConfig.rules.maxLength?.value,
      maxLengthMessage:
        formFieldConfig.rules.maxLength?.message ?? DEFAULTS.maxLengthMessage,
    };
    form.reset(resetValue);
  }, [formFieldConfig, form]);

  const onSubmit = (data: TextFieldRulesFormValues) => {
    const ruleUpdated: TextFieldValidationRulesWithMessage = {
      required: data.required
        ? {
            value: true,
            message: data.requiredMessage.trim() || DEFAULTS.requiredMessage,
          }
        : undefined,

      minLength:
        data.minLength || data.minLength === 0
          ? {
              value: data.minLength,
              message:
                data.minLengthMessage.trim() || DEFAULTS.minLengthMessage,
            }
          : undefined,

      maxLength:
        data.maxLength || data.maxLength === 0
          ? {
              value: data.maxLength,
              message:
                data.maxLengthMessage.trim() || DEFAULTS.maxLengthMessage,
            }
          : undefined,
    };

    updateField(
      { ...formFieldConfig, rules: ruleUpdated },
      UpdatedTypeEnum.RuleForm
    );
  };

  // Guardar al desmontar
  useEffect(() => {
    return () => onSubmit(form.getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              const min = form.watch('minLength');
              const preview = applyTemplate(field.value, {
                min: min ?? '{min}',
              });

              return (
                <FormItem>
                  <FormLabel>Min length message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Minimum length is {min}"
                      disabled={min === undefined}
                    />
                  </FormControl>
                  <FormDescription>
                    Use <code>{'{min}'}</code> to insert the configured value.
                    <div className="mt-1 text-xs text-muted-foreground">
                      Preview: <span className="font-medium">{preview}</span>
                    </div>
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
              const max = form.watch('maxLength');
              const preview = applyTemplate(field.value, {
                max: max ?? '{max}',
              });

              return (
                <FormItem>
                  <FormLabel>Max length message</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Maximum length is {max}"
                      disabled={max === undefined}
                    />
                  </FormControl>
                  <FormDescription>
                    Use <code>{'{max}'}</code> to insert the configured value.
                    <div className="mt-1 text-xs text-muted-foreground">
                      Preview: <span className="font-medium">{preview}</span>
                    </div>
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
