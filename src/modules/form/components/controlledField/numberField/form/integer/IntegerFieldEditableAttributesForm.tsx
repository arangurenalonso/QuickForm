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
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../../common/enum/FieldType';
import { FormFieldConfigType } from '../../../common/enum/FormFieldConfigType';
import IntegerFieldEditableProps from '../../type/integer/NumberFieldEditableProps';

interface IntegerFieldEditableAttributesFormProps {
  formFieldConfig: FormFieldConfigType;
}

const IntegerFieldEditableAttributesForm: React.FC<
  IntegerFieldEditableAttributesFormProps
> = ({ formFieldConfig }) => {
  const form = useForm<IntegerFieldEditableProps>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      label: '',
      helperText: '',
      placeholder: '',
      informationText: '',
      prefix: '',
      suffix: '',
      allowNegative: true,
    },
  });

  const { control, handleSubmit, setValue } = form;
  const { updateField } = useDesigner();

  useEffect(() => {
    if (formFieldConfig?.type === FieldTypeEnum.InputTypeInteger) {
      form.reset(formFieldConfig.properties);
    }
  }, [formFieldConfig, form]);

  const cfgRef = useRef(formFieldConfig);
  useEffect(() => {
    cfgRef.current = formFieldConfig;
  }, [formFieldConfig]);

  const onSubmit = useCallback(
    (data: IntegerFieldEditableProps) => {
      const updated: FormFieldConfigType = {
        ...cfgRef.current,
        properties: data,
      };
      updateField(updated, UpdatedTypeEnum.EditableForm);
    },
    [updateField]
  );

  useEffect(() => {
    return () => {
      const data = form.getValues();
      onSubmit(data);
    };
  }, [form, onSubmit]);

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeInteger) return null;

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
                    if (e.key === 'Enter') e.currentTarget.blur();
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
                    if (e.key === 'Enter') e.currentTarget.blur();
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
                    if (e.key === 'Enter') e.currentTarget.blur();
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
                    if (e.key === 'Enter') e.currentTarget.blur();
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
                    if (e.key === 'Enter') e.currentTarget.blur();
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
                    if (e.key === 'Enter') e.currentTarget.blur();
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
                    if (e.key === 'Enter') e.currentTarget.blur();
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

export default IntegerFieldEditableAttributesForm;
