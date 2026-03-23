'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/common/libs/ui/tabs';
import FormCards from '../components/dashboard/formCard/FormCards';
import FormCreateCard from '../components/dashboard/formCard/FormCreateCard';
import CardStatsWrapper from '../components/dashboard/stats/CardStatsWrapper';
import StatsCards from '../components/dashboard/stats/StatsCards';
import FormsList from '../components/dashboard/formCard/FormsList';
import { useToast } from '@/hooks/use-toast';
import { FormType } from '../types/form.types';
import useFormStore from '../hooks/useFormStore';

const FormDashboardView = () => {
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
    <div className="h-full space-y-6 overflow-auto">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>
        <FormsList forms={forms ?? []} />
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
