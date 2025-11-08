import { MOCK_FORMS } from '@/modules/formbuilder/types/mock.data';
import FormCard from './FormCard';

// type FormCardsProps = {
// };

const FormCards = () => {
  const forms = MOCK_FORMS;
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
};
export default FormCards;
