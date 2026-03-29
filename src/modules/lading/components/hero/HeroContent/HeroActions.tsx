import { ArrowRight } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import { useRouter } from 'next/navigation';
import { REGISTER_PATH } from '@/common/libs/auth/auth.constants';
import { useCallback } from 'react';

const HeroActions = () => {
  const router = useRouter();

  const handleGoToRegister = useCallback(() => {
    router.push(REGISTER_PATH);
  }, [router]);
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button
        size="lg"
        variant="secondary"
        className="h-11 rounded-xl px-6"
        onClick={handleGoToRegister}
      >
        Start building
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 rounded-xl px-6"
      >
        <Play className="mr-2 h-4 w-4" />
        Watch demo
      </Button> */}
    </div>
  );
};

export default HeroActions;
