'use client';
import { useState } from 'react';

import DefaultError from '@/components/default-error/default-error';
import { common } from '@/locale/en/common';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { DataModel } from '@/services/protocol/types';
import { useDebouncedState } from '@react-hookz/web';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import DataCardExplorerLoading from '../../../components/data-card/data-card-loading';
import DataModelExplorerCard from '../../../components/data-model-card/data-model-card';
import SearchFilters from '../../../components/search-filters/search-filters';
import SortByField, {
  SortByOption,
} from '../../../components/search-filters/sort-by-field';
import TagsField from '../../../components/search-filters/tags-field';
import ExplorerSearchSection from '../../../components/search-section/search-section';
import AmountOfIssuancesField from './fields/amount-of-issuances-field';
import ConsumpitonPriceField from './fields/consumpiton-price-field';

const sortOptions: SortByOption<DataModel>[] = [
  {
    key: 'newest',
    label: 'Newest',
    value: undefined,
  },
  { key: 'oldest', label: 'Oldest', value: { createdAt: 'ASC' } },
  {
    key: 'price-high-to-low',
    label: 'Price high to low',
    value: { consumptionPrice: 'DESC' },
  },
  {
    key: 'price-low-to-high',
    label: 'Price low to high',
    value: { consumptionPrice: 'ASC' },
  },
  {
    key: 'issuances-high-to-low',
    label: 'Issuances high to low',
    value: { pdasIssuedCount: 'DESC' },
  },
  {
    key: 'issuances-low-to-high',
    label: 'Issuances low to high',
    value: { pdasIssuedCount: 'ASC' },
  },
];

export default function DataModelsExplorerSearch() {
  const [search, setSearch] = useDebouncedState('', 500);
  const [selectedSort, setSort] = useState<SortByOption<DataModel>>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedConsumptionPrice, setSelectedConsumptionPrice] = useState<
    number[]
  >([]);
  const [selectedAmountOfIssuances, setSelectedAmountOfIssuances] = useState<
    number[]
  >([]);

  const metadata = useQuery({
    queryKey: ['data-models-metadata'],
    queryFn: () => apiPublic.explorer_data_models_metadata(),
  });

  const tags = metadata.data?.dataModelsMetadata.tags ?? [];
  const consumptionPrice =
    metadata.data?.dataModelsMetadata.consumptionPrice ?? 0;
  const issuedCount = metadata.data?.dataModelsMetadata.issuedCount ?? 0;

  const dataModelsQuery = useInfiniteQuery({
    queryKey: [
      'data-models',
      selectedTags,
      selectedConsumptionPrice,
      selectedConsumptionPrice[0],
      selectedConsumptionPrice[1],
      selectedAmountOfIssuances,
      selectedAmountOfIssuances[0],
      selectedAmountOfIssuances[1],
      selectedSort?.value,
      search,
    ],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.explorer_data_models_list({
        filter: {
          tags: selectedTags.length > 0 ? selectedTags : undefined,
          consumptionPrice:
            selectedConsumptionPrice.length > 0
              ? {
                  min: selectedConsumptionPrice[0],
                  max: selectedConsumptionPrice[1],
                }
              : undefined,
          issuedCount:
            selectedAmountOfIssuances.length > 0
              ? {
                  min: selectedAmountOfIssuances[0],
                  max: selectedAmountOfIssuances[1],
                }
              : undefined,
          search: search.length > 0 ? search : undefined,
        },
        skip: pageParam,
        order: selectedSort?.value,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.dataModels.length === 12 ? allPages.length * 12 : undefined,
  });

  const dataModels =
    dataModelsQuery.data?.pages?.flatMap(({ dataModels }) => dataModels) ?? [];

  const filters = (
    <>
      <TagsField
        tags={tags}
        selectedTags={selectedTags}
        setTags={setSelectedTags}
        isLoading={metadata.isLoading}
      />
      <ConsumpitonPriceField
        min={consumptionPrice.min}
        max={consumptionPrice.max}
        selectedConsumptionPrice={selectedConsumptionPrice}
        setConsumptionPrice={setSelectedConsumptionPrice}
        isLoading={metadata.isLoading}
      />
      <AmountOfIssuancesField
        min={issuedCount.min}
        max={issuedCount.max}
        selectedAmountOfIssuances={selectedAmountOfIssuances}
        setAmountOfIssuances={setSelectedAmountOfIssuances}
        isLoading={metadata.isLoading}
      />
      <SortByField
        selectedSort={undefined}
        onSort={() => {}}
        options={sortOptions}
      />
    </>
  );

  return (
    <ExplorerSearchSection
      title={explorerDataModels.listTitle}
      emptyText={explorerDataModels.empty}
      errorMessage="Error on searching for data models"
      isEmpty={dataModelsQuery.isSuccess && dataModels.length === 0}
      isError={dataModelsQuery.isError}
      isLoading={dataModelsQuery.isLoading}
      isFetchingMore={dataModelsQuery.isFetchingNextPage}
      hasMore={dataModelsQuery.hasNextPage}
      onSearch={setSearch}
      fetchMore={() => dataModelsQuery.fetchNextPage()}
      filters={filters}
      cards={
        dataModelsQuery.isSuccess &&
        dataModels.length > 0 &&
        dataModels.map((dataModel) => (
          <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
        ))
      }
    />
  );
}
