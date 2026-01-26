import { Button } from '@/common/libs/ui/button';
import { FaSpinner } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useTransition } from 'react';
import { HiSaveAs } from 'react-icons/hi';

const SaveFormBtn = () => {
  const { toast } = useToast();
  const { sections } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const payload = sections.map((section) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        question: section.fields.map((field) => ({
          id: field.id,
          type: field.type,
          properties: field.properties,
          rules: field.rules,
        })),
      }));

      const json = JSON.stringify(payload);
      console.log('save payload:', payload);
      console.log('save json:', json);

      // await UpdateFormContent(id, json);

      toast({
        title: 'Success',
        description: 'Your form has been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later ${String(error)}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin h-4 w-4" />}
    </Button>
  );
};

export default SaveFormBtn;
