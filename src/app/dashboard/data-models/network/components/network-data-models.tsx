'use client';

import { api } from '@/services/api/api';
import { DataModel, PaginatedResponse } from '@/services/api/models';
import { useInfiniteQuery } from '@tanstack/react-query';

import DataModelList from '../../components/data-model-list';

export default function NetworkDataModels() {
  const { data, hasNextPage, fetchNextPage, isFetching, isSuccess } =
    useInfiniteQuery({
      queryKey: ['network-data-models'],
      queryFn: async ({ pageParam = 1 }) => {
        console.log(pageParam);
        const { data, error } = await api.GET('/data-models', {
          params: {
            query: {
              page: pageParam as number,
              page_size: 10,
            },
          },
        });

        if (error) {
          throw new Error(error);
        }

        if (!data) {
          throw new Error('No data');
        }

        return data as PaginatedResponse<DataModel[]>;
      },
      getNextPageParam: (lastPage) => {
        const { current_page, total_pages } = lastPage.meta;
        return current_page + 1 <= total_pages ? current_page + 1 : null;
      },
      getPreviousPageParam: (firstPage) => {
        const { current_page } = firstPage.meta;
        return current_page - 1 >= 0 ? current_page - 1 : null;
      },
      initialPageParam: 1,
    });

  const dataModels =
    (data?.pages.flatMap((page) => page.data) as DataModel[]) ?? [];
  const totalRows = data?.pages[0]?.meta.total_items ?? 0;

  return (
    <>
      <DataModelList
        dataModels={dataModels}
        totalLoadedPages={data?.pages.length ?? 0}
        hasNextPage={hasNextPage}
        totalRows={totalRows}
        isSuccess={isSuccess}
        isLoading={isFetching}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
}
