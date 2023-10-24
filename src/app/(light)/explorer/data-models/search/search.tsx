'use client';
import Loading from '@/components/loadings/loading/loading';
import { common } from '@/locale/en/common';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Box, Button, Container, Stack, Typography } from '@mui/material';

import DataModelExplorerCard from '../../components/data-model-card';
import DataModelsExplorerSearchFilters from './filters';

export default function DataModelsExplorerSearch() {
  const dataModels = useInfiniteQuery({
    queryKey: ['data-models'],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.explorer_data_models_list({ filter: {}, skip: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.dataModels.length === 12 ? allPages.length * 12 : undefined,
  });

  return (
    <Container
      component={Stack}
      sx={{
        display: 'flex',
        py: 3,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        {explorerDataModels.listTitle}
      </Typography>
      <DataModelsExplorerSearchFilters />
      {dataModels.isLoading && <Loading margin={12} />}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={3}
      >
        {dataModels.data?.pages?.flatMap(({ dataModels }) =>
          dataModels.map((dataModel) => (
            <DataModelExplorerCard dataModel={dataModel} key={dataModel.id} />
          ))
        )}
      </Box>
      {dataModels.isFetchingNextPage && <Loading margin={6} />}
      {!dataModels.isFetchingNextPage && dataModels.hasNextPage && (
        <Button
          type="button"
          variant="contained"
          onClick={() => dataModels.fetchNextPage()}
          sx={{ my: 6, alignSelf: 'center' }}
        >
          {common.actions.load_more}
        </Button>
      )}
    </Container>
  );
}
