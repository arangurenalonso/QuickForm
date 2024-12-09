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
import { Input } from '@/components/ui/input';
import TextFieldEditableProps from '../type/TextFieldEditableProps';
import { FormFieldConfigType } from '../../enum/FormFieldConfigType';
import { FieldTypeEnum } from '../../enum/FieldType';
import useDesigner from '@/hooks/useDesigner';

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
  const { updatedElement } = useDesigner();

  useEffect(() => {
    if (formFieldConfig?.type === FieldTypeEnum.InputTypeText) {
      form.reset(formFieldConfig.properties);
    }
  }, [formFieldConfig, form]);

  const onSubmit = (data: TextFieldEditableProps) => {
    const formFieldConfigUpdated: FormFieldConfigType = {
      ...formFieldConfig,
      properties: data,
    };
    updatedElement(formFieldConfigUpdated);
  };

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeText) {
    return null;
  }
  // onSubmit={handleSubmit(onSubmit)}
  // onBlur={handleSubmit(onSubmit)}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
      </div>
    </Form>
  );
};

export default TextFieldEditableAttributesForm;
