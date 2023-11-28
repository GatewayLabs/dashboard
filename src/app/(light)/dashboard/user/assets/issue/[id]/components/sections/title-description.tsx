import ErrorMessage from '@/components/form/error-message/error-message';
import { common } from '@/locale/en/common';
import { Controller, useFormContext } from 'react-hook-form';

import { Paper, Stack, TextField, Typography } from '@mui/material';

export default function TitleDescriptionSection() {
  const { control } = useFormContext();
  return (
    <Paper
      component={Stack}
      elevation={0}
      sx={{
        p: 3,
        border: 1,
        borderColor: 'divider',
      }}
      gap={4}
    >
      <Typography variant="h5">{common.general.details}</Typography>
      <Stack gap={3}>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField label="Title" fullWidth {...field} error={!!error} />
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                error={!!error}
                {...field}
              />
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </>
          )}
        />
      </Stack>
    </Paper>
  );
}