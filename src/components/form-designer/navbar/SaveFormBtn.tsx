import { Button } from '@/components/ui/button';
import { FaSpinner } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import useDesigner from '@/hooks/useDesigner';
import { useTransition } from 'react';
import { HiSaveAs } from 'react-icons/hi';

const SaveFormBtn = () => {
  const { toast } = useToast();
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      console.log('jsonElements', jsonElements);

      // await UpdateFormContent(id, jsonElements);
      toast({
        title: 'Success',
        description: 'Your form has been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later ${error}`,
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
