'use client';
// import { Filter, ListFilter, Plus, Search } from 'lucide-react';
// import { Button } from '@/common/libs/ui/button';
// import { Card, CardContent } from '@/common/libs/ui/card';
// import { Input } from '@/common/libs/ui/input';
// import StatusBadge from '@/common/components/molecules/StatusBadge';
import { FormType } from '@/modules/form/types/form.types';
// import FormListHeader from './FormListHeader';
import DataTable, {
  DataTableQueryState,
  DEFAULT_DATA_TABLE_QUERY_STATE,
} from '@/common/components/dynamic-table/DataTable';
import {
  DynamicTableRowType,
  DynamicTableColumnType,
} from '@/common/components/dynamic-table/dynamic-table.types';
import { DEFAULT_EMPTY_PAGINATION } from '@/common/components/dynamic-table/dynamic-table.utils';
import { QuestionTypeFiltersGroupType } from '@/common/components/filters/filters.types';
import useAuthErrorModalWatcher from '@/common/components/molecules/error/useAuthErrorModalWatcher';
import { PaginationResultType } from '@/common/components/pagination/pagination.types';
import useFormStore from '@/modules/form/hooks/useFormStore';
import { ModalErrorType } from '@/modules/ui/store/modal/modal.type';
import { useState, useCallback, useEffect } from 'react';

const FormsList = () => {
  const {
    getSubmissions,
    getFormColumns,
    getQuestionTypeFiltersCatalog,
    error,
  } = useFormStore();

  useAuthErrorModalWatcher({
    error,
    id: ModalErrorType.GET_SUBMISSIONS_ERROR,
  });

  const [catalog, setCatalog] = useState<QuestionTypeFiltersGroupType[]>([]);

  const [data, setData] = useState<PaginationResultType<DynamicTableRowType>>(
    DEFAULT_EMPTY_PAGINATION
  );
  const [column, setColumn] = useState<DynamicTableColumnType[]>([]);

  const handleLoadCatalog = useCallback(async () => {
    const result = await getQuestionTypeFiltersCatalog();
    if (!result) {
      return;
    }
    setCatalog(result);
    console.log('Catalog loaded:', result);
  }, [getQuestionTypeFiltersCatalog]);

  const handleLoadColumns = useCallback(async () => {
    const result = await getFormColumns();
    if (!result) {
      return;
    }
    setColumn(result);
  }, [getFormColumns]);

  const handleGetSubmissions = useCallback(
    async (queryState: DataTableQueryState) => {
      // const { page, pageSize, filters } = queryState;

      console.log('Fetching submissions with query:', queryState);
    },
    []
  );

  useEffect(() => {
    void handleLoadCatalog();
  }, [handleLoadCatalog]);

  useEffect(() => {
    void handleLoadColumns();
  }, [handleLoadColumns]);

  useEffect(() => {
    void handleGetSubmissions(DEFAULT_DATA_TABLE_QUERY_STATE);
  }, [handleGetSubmissions]);

  return (
    <section className="">
      <DataTable
        title="Submissions"
        description="Review all responses submitted for this form."
        columns={column}
        data={data}
        catalog={catalog}
        onChange={handleGetSubmissions}
      />
    </section>
  );
  // return (
  //   <div className="space-y-6">
  //     <FormListHeader
  //       title="Forms"
  //       description="Manage all your forms, visibility, and publishing status from a single place."
  //       action={
  //         <Button className="rounded-xl">
  //           <Plus className="mr-2 h-4 w-4" />
  //           Create form
  //         </Button>
  //       }
  //     />

  //     <Card className="rounded-[28px] border-border bg-card shadow-sm">
  //       <CardContent className="p-5">
  //         <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
  //           <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
  //             <div className="relative w-full sm:max-w-sm">
  //               <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
  //               <Input
  //                 className="h-11 rounded-xl pl-9"
  //                 placeholder="Search forms..."
  //               />
  //             </div>
  //             <Button variant="outline" className="rounded-xl">
  //               <Filter className="mr-2 h-4 w-4" />
  //               Status
  //             </Button>
  //             <Button variant="outline" className="rounded-xl">
  //               <ListFilter className="mr-2 h-4 w-4" />
  //               Visibility
  //             </Button>
  //           </div>
  //           <Button variant="outline" className="rounded-xl">
  //             Export list
  //           </Button>
  //         </div>
  //       </CardContent>
  //     </Card>

  //     <Card className="overflow-hidden rounded-[28px] border-border bg-card shadow-sm">
  //       <div className="overflow-x-auto">
  //         <table className="w-full min-w-[820px]">
  //           <thead className="bg-muted/40">
  //             <tr className="border-b border-border text-left text-sm text-muted-foreground">
  //               <th className="px-6 py-4 font-medium">Form</th>
  //               <th className="px-6 py-4 font-medium">Status</th>
  //               <th className="px-6 py-4 font-medium">Updated</th>
  //               <th className="px-6 py-4 font-medium">Submissions</th>
  //               <th className="px-6 py-4 font-medium">Visibility</th>
  //               <th className="px-6 py-4 font-medium">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {forms.map((form) => (
  //               <tr
  //                 key={form.name}
  //                 className="border-b border-border/70 last:border-0"
  //               >
  //                 <td className="px-6 py-5">
  //                   <div>
  //                     <p className="font-medium text-foreground">{form.name}</p>
  //                     <p className="mt-1 text-sm text-muted-foreground">
  //                       Structured workflow form
  //                     </p>
  //                   </div>
  //                 </td>
  //                 <td className="px-6 py-5">
  //                   <StatusBadge
  //                     tone={form.status === 'Published' ? 'success' : 'warning'}
  //                   >
  //                     {form.status}
  //                   </StatusBadge>
  //                 </td>
  //                 <td className="px-6 py-5 text-sm text-muted-foreground">
  //                   {form.updated}
  //                 </td>
  //                 <td className="px-6 py-5 text-sm font-medium text-foreground">
  //                   {form.submissions}
  //                 </td>
  //                 <td className="px-6 py-5 text-sm text-muted-foreground">
  //                   {form.visibility}
  //                 </td>
  //                 <td className="px-6 py-5">
  //                   <div className="flex items-center gap-2">
  //                     <Button
  //                       variant="outline"
  //                       size="sm"
  //                       className="rounded-xl"
  //                     >
  //                       Edit
  //                     </Button>
  //                     <Button
  //                       variant="ghost"
  //                       size="sm"
  //                       className="rounded-xl text-muted-foreground hover:text-foreground"
  //                     >
  //                       Open
  //                     </Button>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </Card>
  //   </div>
  // );
};

export default FormsList;
