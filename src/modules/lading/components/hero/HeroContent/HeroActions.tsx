import { ArrowRight } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';

const HeroActions = () => {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button size="lg" className="h-11 rounded-xl px-6">
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
