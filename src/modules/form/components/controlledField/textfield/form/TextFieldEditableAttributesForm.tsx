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
import TextFieldEditableProps from '../type/TextFieldEditableProps';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../common/enum/FieldType';
import { FormFieldConfigType } from '../../common/enum/FormFieldConfigType';

import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';

interface TextFieldEditableAttributesFormProps {
  formFieldConfig: FormFieldConfigType;
}

const TextFieldEditableAttributesForm: React.FC<
  TextFieldEditableAttributesFormProps
> = ({ formFieldConfig }) => {
  const form = useForm<TextFieldEditableProps>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      label: '',
      helperText: '',
      placeholder: '',
      informationText: '',
    },
  });

  const { updateField } = useDesigner();

  useEffect(() => {
    if (formFieldConfig?.type === FieldTypeEnum.InputTypeText) {
      form.reset(formFieldConfig.properties);
    }
  }, [formFieldConfig, form]);

  const cfgRef = useRef(formFieldConfig);
  useEffect(() => {
    cfgRef.current = formFieldConfig;
  }, [formFieldConfig]);

  const onSubmit = useCallback(
    (data: TextFieldEditableProps) => {
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
  }, [onSubmit, form]);

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeText) return null;

  return (
    <Form {...form}>
      <div onBlur={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
      </div>
    </Form>
  );
};

export default TextFieldEditableAttributesForm;
