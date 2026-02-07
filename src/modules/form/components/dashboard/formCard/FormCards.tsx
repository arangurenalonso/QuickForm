import FormCard from './FormCard';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import useFormStore from '@/modules/form/hooks/useFormStore';
import FormCardSkeleton from './FormCardSkeleton';
import { FormType } from '@/modules/form/types/form.types';

// type FormCardsProps = {
// };
const skeletons = Array.from({ length: 4 });

const FormCards = () => {
  const { getForms } = useFormStore();
  const [forms, setForms] = useState<FormType[]>([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const handleGetForms = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getForms();

      if (!data) {
        toast({ title: 'Error', description: 'Failed to load forms' });
        setForms([]);
        return;
      }

      setForms(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later. ${message}`,
      });
    } finally {
      setLoading(false);
    }
  }, [getForms, toast]);

  useEffect(() => {
    handleGetForms();
  }, [handleGetForms]);

  return (
    <>
      {loading
        ? skeletons.map((_, i) => <FormCardSkeleton key={i} />)
        : forms.map((form) => <FormCard key={form.id} form={form} />)}
    </>
  );
};
export default FormCards;
