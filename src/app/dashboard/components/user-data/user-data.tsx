'use client';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { limitCharsOffset } from '@/utils/string';
import { useSnackbar } from 'notistack';

import { ContentCopy } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Typography, Stack } from '@mui/material';

// TODO: Unify Copy Buttons

export default function UserData({
  username,
  did,
  access,
}: {
  username?: string | null;
  did: string;
  access: string;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar('Copied Successfully!');
    } catch (err) {
      enqueueSnackbar('Unexpected error', { variant: 'error' });
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={'space-between'}
      borderRadius={0}
    >
      <GTWAvatar name={did} alt={username ?? did} size={45} />
      <Stack
        component="span"
        direction={!!username ? 'column' : 'row'}
        alignItems={!!username ? 'flex-start' : 'center'}
        pl={2}
        width="100%"
        gap={!!username ? 0 : 1.2}
      >
        <Typography component="span" variant="subtitle1" color="text.primary">
          {username ?? limitCharsOffset(did, 15, 5)}
        </Typography>

        {!!username ? (
          <>
            <Stack
              component="span"
              direction="row"
              alignItems="center"
              lineHeight={1}
              justifyContent="flex-start"
              gap={0.75}
              sx={{ mt: -1 }}
            >
              <Typography
                component="span"
                variant="caption"
                fontWeight={400}
                color="text.secondary"
                lineHeight={1}
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {limitCharsOffset(did, 3, 4)}
              </Typography>
              <IconButton onClick={() => copy(did)}>
                <ContentCopy
                  sx={{
                    fontSize: 16,
                    color: 'text.disabled',
                  }}
                />
              </IconButton>
              <Typography
                variant="caption"
                color="text.secondary"
                align="right"
                sx={{ mt: -3.5, ml: access.length < 20 ? 12.5 : 5 }}
              >
                {access}
              </Typography>
            </Stack>
          </>
        ) : (
          <IconButton onClick={() => copy(did)}>
            <ContentCopy
              sx={{
                fontSize: 16,
                color: 'text.disabled',
              }}
            />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
}
