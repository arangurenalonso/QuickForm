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
// import { Input } from '@/common/libs/ui/input';
import { Switch } from '@/common/libs/ui/switch';
import { Input } from '@/common/libs/ui/input';
import { NumericFormat } from 'react-number-format';
import {
  TextFieldValidationRules,
  TextFieldValidationRulesWithMessage,
} from '../type/TextFieldValidationRules';
import { FormFieldConfigType } from '../../enum/FormFieldConfigType';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../enum/FieldType';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';

interface TextFieldRulesFormProps {
  formFieldConfig: FormFieldConfigType;
}

const TextFieldRulesForm: React.FC<TextFieldRulesFormProps> = ({
  formFieldConfig,
}) => {
  const { updatedElement } = useDesigner();

  const form = useForm<TextFieldValidationRules>({
    mode: 'onBlur',
    defaultValues: {
      required: false,
      maxLength: undefined,
      minLength: undefined,
    },
  });

  useEffect(() => {
    if (formFieldConfig?.type === FieldTypeEnum.InputTypeText) {
      const value: TextFieldValidationRules = {
        required: formFieldConfig.rules.required as boolean,
        maxLength: formFieldConfig.rules.maxLength?.value,
        minLength: formFieldConfig.rules.minLength?.value,
      };
      form.reset(value);
    }
  }, [formFieldConfig, form]);

  const onSubmit = (data: TextFieldValidationRules) => {
    const ruleUpdated: TextFieldValidationRulesWithMessage = {
      required: data.required ? 'Filed is required' : false,
      maxLength: data.maxLength
        ? { value: data.maxLength, message: `Max lenght ${data.maxLength}` }
        : undefined,
      minLength: data.minLength
        ? { value: data.minLength, message: `Min length ${data.minLength}` }
        : undefined,
    };

    const formFieldConfigUpdated: FormFieldConfigType = {
      ...formFieldConfig,
      rules: ruleUpdated,
    };
    updatedElement(formFieldConfigUpdated, UpdatedTypeEnum.RuleForm);
  };

  useEffect(() => {
    return () => {
      const data = form.getValues();
      onSubmit(data);
    };
  }, []);

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeText) {
    return null;
  }

  return (
    <Form {...form}>
      <div onBlur={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
                  onCheckedChange={(checked) =>
                    form.setValue(field.name, !!checked)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Length</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  name={field.name}
                  disabled={field.disabled}
                  getInputRef={field.ref}
                  placeholder="Enter minimum length"
                  onValueChange={(values) => {
                    form.setValue(field.name, values.floatValue);
                  }}
                  className="flex-1 bg-transparent placeholder:text-muted-foreground"
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
          name="maxLength"
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
                  placeholder="Enter maximon length"
                  onValueChange={(values) => {
                    form.setValue(field.name, values.floatValue);
                  }}
                  className="flex-1 bg-transparent placeholder:text-muted-foreground"
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
      </div>
    </Form>
  );
};

export default TextFieldRulesForm;
