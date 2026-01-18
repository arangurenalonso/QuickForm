import FormCard from './FormCard';
import { useEffect, useState } from 'react';
import { formType } from '../../../types/form.types';
import { useToast } from '@/hooks/use-toast';
import useFormStore from '@/modules/formbuilder/hooks/useFormStore';
import FormCardSkeleton from './FormCardSkeleton';

// type FormCardsProps = {
// };

const FormCards = () => {
  const { getFormaProcess } = useFormStore();
  const [forms, setForms] = useState<formType[]>([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetForms();
  }, []);

  const handleGetForms = async () => {
    try {
      setLoading(true);
      const forms = await getFormaProcess();
      if (!forms) {
        toast({
          title: 'Error',
          description: 'Failed to load forms',
        });
        return;
      }
      setForms(forms);
    } catch (e) {
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later ${e}`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((el) => (
          <FormCardSkeleton key={el} />
        ))}
      </>
    );
  }
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};
export default FormCards;
