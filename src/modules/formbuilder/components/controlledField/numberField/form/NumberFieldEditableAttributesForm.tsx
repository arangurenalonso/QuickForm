import { useCallback, useEffect } from 'react';
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
import NumberFieldEditableProps from '../type/NumberFieldEditableProps';
import { NumericFormat } from 'react-number-format';
import { Switch } from '@/common/libs/ui/switch';
import { FormFieldConfigType } from '../../enum/FormFieldConfigType';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../enum/FieldType';
import useDesigner from '@/hooks/useDesigner';

interface NumberFieldEditableAttributesFormProps {
  formFieldConfig: FormFieldConfigType;
}

const NumberFieldEditableAttributesForm: React.FC<
  NumberFieldEditableAttributesFormProps
> = ({ formFieldConfig }) => {
  const form = useForm<NumberFieldEditableProps>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      label: '',
      helperText: '',
      placeholder: '',
      informationText: '',
      prefix: '',
      suffix: '',
      decimalScale: 2,
      allowNegative: true,
    },
  });
  const { control, handleSubmit, setValue } = form;
  const { updatedElement } = useDesigner();
  useEffect(() => {
    if (formFieldConfig?.type === FieldTypeEnum.InputTypeNumber) {
      form.reset(formFieldConfig.properties);
    }
  }, [formFieldConfig, form]);

  const onSubmit = useCallback(
    (data: NumberFieldEditableProps) => {
      const formFieldConfigUpdated: FormFieldConfigType = {
        ...formFieldConfig,
        properties: data,
      };
      updatedElement(formFieldConfigUpdated, UpdatedTypeEnum.EditableForm);
    },
    [formFieldConfig, updatedElement]
  );
  useEffect(() => {
    return () => {
      const data = form.getValues();
      onSubmit(data);
    };
  }, []);
  if (formFieldConfig.type !== FieldTypeEnum.InputTypeNumber) {
    return null;
  }
  return (
    <Form {...form}>
      <div onBlur={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormDescription>
                The name of the field. It is the name of the property that will
                be assigned to the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Enter label"
                />
              </FormControl>
              <FormDescription>
                The label of the field. It will be displayed above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Enter placeholder"
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Enter helper text"
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. It will be displayed below the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="informationText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Information Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Enter information text"
                />
              </FormControl>
              <FormDescription>
                The information text of the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="prefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prefix</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Enter prefix"
                />
              </FormControl>
              <FormDescription>
                A prefix that will appear before the number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="suffix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suffix</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Enter suffix"
                />
              </FormControl>
              <FormDescription>
                A suffix that will appear after the number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="decimalScale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Decimal Scale</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value}
                  name={field.name}
                  disabled={field.disabled}
                  getInputRef={field.ref}
                  placeholder="Enter decimal scale"
                  onValueChange={(values) => {
                    setValue(field.name, values.floatValue);
                  }}
                  className="flex-1 bg-transparent placeholder:text-muted-foreground"
                  allowNegative={false}
                  customInput={Input}
                />
              </FormControl>
              <FormDescription>
                The number of decimal places allowed for the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="allowNegative"
          render={({ field }) => (
            <FormItem>
              <div className=" flex gap-2 items-center ">
                <FormLabel>Allow Negative</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      setValue(field.name, !!checked)
                    }
                  />
                </FormControl>
              </div>
              <FormDescription>
                Whether the field allows negative numbers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default NumberFieldEditableAttributesForm;
