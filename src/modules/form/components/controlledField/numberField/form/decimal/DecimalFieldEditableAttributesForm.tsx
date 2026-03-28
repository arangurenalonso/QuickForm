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
import { NumericFormat } from 'react-number-format';
import { Switch } from '@/common/libs/ui/switch';
import { FieldTypeEnum, UpdatedTypeEnum } from '../../../common/enum/FieldType';
import { FormFieldConfigType } from '../../../common/enum/FormFieldConfigType';
import DecimalFieldEditableProps from '../../type/decimal/DecimalFieldEditableProps';
import useDesigner from '@/modules/form/components/form-designer/context/useDesigner';

interface DecimalFieldEditableAttributesFormProps {
  formFieldConfig: FormFieldConfigType;
  canEdit: boolean;
}

const DecimalFieldEditableAttributesForm: React.FC<
  DecimalFieldEditableAttributesFormProps
> = ({ formFieldConfig, canEdit }) => {
  const form = useForm<DecimalFieldEditableProps>({
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

  const { control, handleSubmit } = form;
  const { updateField } = useDesigner();

  useEffect(() => {
    if (formFieldConfig?.type === FieldTypeEnum.InputTypeDecimal) {
      form.reset(formFieldConfig.properties);
    }
  }, [formFieldConfig, form]);

  const cfgRef = useRef(formFieldConfig);
  useEffect(() => {
    cfgRef.current = formFieldConfig;
  }, [formFieldConfig]);

  const onSubmit = useCallback(
    (data: DecimalFieldEditableProps) => {
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

  if (formFieldConfig.type !== FieldTypeEnum.InputTypeDecimal) return null;

  return (
    <Form {...form}>
      <div onBlur={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
          disabled={!canEdit}
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
                    field.onChange(values.floatValue ?? '');
                  }}
                  isAllowed={(values) => {
                    return (
                      values.floatValue === undefined ||
                      (values.floatValue >= 1 && values.floatValue <= 8)
                    );
                  }}
                  className="flex-1 bg-transparent placeholder:text-muted-foreground"
                  allowNegative={false}
                  decimalScale={0}
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
          disabled={!canEdit}
          name="allowNegative"
          render={({ field }) => (
            <FormItem>
              <div className=" flex gap-2 items-center ">
                <FormLabel>Allow Negative</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    disabled={field.disabled}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
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

export default DecimalFieldEditableAttributesForm;
