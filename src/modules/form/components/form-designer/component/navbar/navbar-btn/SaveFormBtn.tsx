import { Button } from '@/common/libs/ui/button';
import { FaSpinner } from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';
import { useCallback, useEffect, useTransition } from 'react';
import { HiSaveAs } from 'react-icons/hi';
import useFormStore from '@/modules/form/hooks/useFormStore';

const SaveFormBtn = () => {
  const { toast } = useToast();
  const [loading, startTransition] = useTransition();
  const {
    saveFormStructure,
    formSelected,
    error,
    draftStructure,
    computedDirty,
  } = useFormStore();

  useEffect(() => {
    if (!error) return;

    const message = error.message ?? JSON.stringify(error);

    toast({
      title: 'Error',
      description: `Something went wrong, please try again later. ${message}`,
      variant: 'destructive',
    });
  }, [error, toast]);

  const updateFormContent = useCallback(async () => {
    try {
      const payload = draftStructure;
      if (!formSelected) {
        throw new Error('Form not selected');
      }
      const res = await saveFormStructure(payload, formSelected.id);
      if (!res) {
        return;
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
  }, [draftStructure, formSelected, saveFormStructure, toast]);

  return (
    <Button
      variant="outline"
      className="relative gap-2"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      {' '}
      <HiSaveAs className="h-4 w-4" />
      Save
      {computedDirty && !loading && (
        <span
          className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-white animate-pulse"
          aria-label="Unsaved changes"
          title="You have unsaved changes"
        >
          !
        </span>
      )}
      {loading && <FaSpinner className="h-4 w-4 animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
