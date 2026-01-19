'use client';

import { Suspense } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/common/libs/ui/tabs';
import FormCards from '../components/dashboard/formCard/FormCards';
import CardStatsWrapper from '../components/dashboard/stats/CardStatsWrapper';
import StatsCards from '../components/dashboard/stats/StatsCards';
import FormCreateCard from '../components/dashboard/formCard/FormCreateCard';

const FormDashboardView = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Suspense fallback={<StatsCards loading={true} />}>
            <CardStatsWrapper />
          </Suspense>
        </TabsContent>

        <TabsContent value="forms" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <FormCreateCard />
            <FormCards />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormDashboardView;
