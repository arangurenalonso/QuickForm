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
} from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { NumericFormat } from 'react-number-format';
import {
  NumberFieldValidationRulesWithMessage,
  NumberFieldValidationRules,
} from '../type/NumberFieldValidationRules';
import { FormFieldConfigType } from '../../enum/FormFieldConfigType';
import { FieldTypeEnum } from '../../enum/FieldType';
import useDesigner from '@/hooks/useDesigner';

interface NumberFieldRulesFormProps {
  formFieldConfig: FormFieldConfigType;
}

const NumberFieldRulesForm: React.FC<NumberFieldRulesFormProps> = ({
  formFieldConfig,
}) => {
  const { updatedElement } = useDesigner();
  const form = useForm<NumberFieldValidationRules>({
    mode: 'onBlur',
    defaultValues: {
      required: false,
      max: undefined,
      min: undefined,
    },
  });

  const { control, handleSubmit, setValue } = form;

  useEffect(() => {
    if (formFieldConfig?.type === FieldTypeEnum.InputTypeNumber) {
      const value: NumberFieldValidationRules = {
        required: formFieldConfig.rules.required as boolean,
        max: formFieldConfig.rules.max?.value,
        min: formFieldConfig.rules.min?.value,
      };
      form.reset(value);
    }
  }, [formFieldConfig, form]);

  const onSubmit = (data: NumberFieldValidationRules) => {
    const ruleUpdated: NumberFieldValidationRulesWithMessage = {
      required: data.required ? 'Filed is required' : false,
      max: data.max
        ? { value: data.max, message: `Cannot exceed ${data.max}` }
        : undefined,
      min: data.min
        ? { value: data.min, message: `Must be at least ${data.min}` }
        : undefined,
    };

    const formFieldConfigUpdated: FormFieldConfigType = {
      ...formFieldConfig,
      rules: ruleUpdated,
    };
    updatedElement(formFieldConfigUpdated);
  };

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeNumber) {
    return null;
  }
  return (
    <Form {...form}>
      <div onBlur={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="required"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Mark if the field is required.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => setValue(field.name, !!checked)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="min"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Length</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  name={field.name}
                  disabled={field.disabled}
                  getInputRef={field.ref}
                  placeholder="Enter min value"
                  onValueChange={(values) => {
                    setValue(field.name, values.floatValue);
                  }}
                  className="flex-1 bg-transparent placeholder:text-muted-foreground"
                  allowNegative={true}
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
          control={control}
          name="max"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Length</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  name={field.name}
                  disabled={field.disabled}
                  onBlur={field.onBlur}
                  getInputRef={field.ref}
                  placeholder="Enter max value"
                  onValueChange={(values) => {
                    setValue(field.name, values.floatValue);
                  }}
                  className="flex-1 bg-transparent placeholder:text-muted-foreground"
                  allowNegative={true}
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
      </div>
    </Form>
  );
};

export default NumberFieldRulesForm;
