import LoginView from '@/modules/auth/containers/AuthView';
import { ActionAuthViewEnum } from '@/modules/auth/enum/auth.enum';

async function BuilderPage() {
  return (
    <>
      <LoginView action={ActionAuthViewEnum.EMAIL_CONFIRMATION} />
    </>
  );
}

export default BuilderPage;
