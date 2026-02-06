import { Button } from '@/common/libs/ui/button';
import { FaSpinner } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import useDesigner from '@/modules/formbuilder/form-designer/context/useDesigner';
import { useTransition } from 'react';
import { HiSaveAs } from 'react-icons/hi';
import useFormStore from '@/modules/formbuilder/hooks/useFormStore';

const SaveFormBtn = () => {
  const { toast } = useToast();
  const { sections } = useDesigner();
  const [loading, startTransition] = useTransition();
  const { saveFormStructure, formSelected } = useFormStore();

  const updateFormContent = async () => {
    try {
      const payload = sections;
      if (!formSelected) {
        throw new Error('Form not selected');
      }
      const res = await saveFormStructure(payload, formSelected.id);
      if (!res) {
        throw new Error('Form creation failed');
      }
      toast({
        title: 'Success',
        description: 'Your form has been updated',
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
