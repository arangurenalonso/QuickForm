import { Separator } from '@/common/libs/ui/separator';
import { Suspense } from 'react';
import FormCards from '../components/dashboard/formCard/FormCards';
import FormCardSkeleton from '../components/dashboard/formCard/FormCardSkeleton';
import CardStatsWrapper from '../components/dashboard/stats/CardStatsWrapper';
import StatsCards from '../components/dashboard/stats/StatsCards';
import CreateFormBtn from '../components/dashboard/btn/CreateFormBtn';

const FormDashboardView = () => {
  return (
    <div className=" ">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default FormDashboardView;
