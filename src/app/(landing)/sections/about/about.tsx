import Image from 'next/image';
import Link from 'next/link';

import documentationRoutes from '@/constants/documentationRoutes';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import AboutCards from './about-cards';

import NavigationImage from '/public/images/navigation.jpg';

export default function About() {
  return (
    <Box
      component="section"
      sx={{
        pt: 11,
        pb: 15,
      }}
    >
      <Stack
        component={Container}
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        gap={2}
      >
        <Stack
          component={Card}
          variant="outlined"
          sx={{
            backgroundColor: 'primary.100',
            width: {
              xs: 'unset',
              sm: '50%',
            },
          }}
        >
          <CardActionArea
            component={Link}
            href={documentationRoutes.home}
            target="_blank"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 4,
              pb: {
                xs: 4,
                md: 42.25,
              },
              gap: 4,
              bgcolor: '#fff',
            }}
          >
            <Stack gap={1}>
              <Typography
                component="h3"
                variant="subtitle1"
                color={'primary.main'}
              >
                For developers
              </Typography>
              <Typography
                component="h2"
                variant="h3"
                sx={{
                  typography: {
                    xs: 'h5',
                    sm: 'h4',
                    md: 'h3',
                  },
                }}
              >
                Why use Gateway?
              </Typography>
              <Typography variant="body1">
                Gateway is the only Layer 1 blockchain offering native unified
                state, eliminating the need for extra layers or co-processors.
                With Gateway, developers get everything they need to build
                powerful applications and unlock new use cases.
              </Typography>
            </Stack>

            <Button
              component="span"
              size="large"
              variant="contained"
              sx={{ alignSelf: 'flex-start' }}
            >
              Start building
            </Button>
          </CardActionArea>
        </Stack>
        <Card
          variant="outlined"
          sx={{
            backgroundColor: 'primary.100',
            width: {
              xs: 'unset',
              sm: '50%',
            },

            position: 'relative',
            height: {
              xs: '100%',
              sm: 'auto',
            },
            aspectRatio: {
              xs: 327 / 306,
              sm: 'unset',
            },
          }}
        >
          <Image
            src={NavigationImage}
            alt="A worker working on a futuristic navigation system"
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: '35% 55%',
            }}
          />
        </Card>
      </Stack>
      <Container
        sx={{
          pt: 2,
          px: {
            xs: 0,
            lg: 6,
          },
        }}
      >
        <AboutCards />
      </Container>
    </Box>
  );
}
