import Image from 'next/image';
import Link from 'next/link';

import SixthMan from 'public/images/investors/logo-6th-man.png';
import Figment from 'public/images/investors/logo-figment.png';
import HannaGrey from 'public/images/investors/logo-hanna-grey.png';
import ReciprocalVentures from 'public/images/investors/logo-reciprocal-ventures.png';
import RedbeardVentures from 'public/images/investors/logo-redbeard-ventures.png';
import Spartan from 'public/images/investors/logo-spartan.png';
import Visary from 'public/images/investors/logo-visary.png';

import { Box, Divider, Stack, Typography } from '@mui/material';

const logos = [
  {
    alt: 'Reciprocal Ventures',
    href: 'https://www.recvc.com/',
    src: ReciprocalVentures,
  },
  {
    alt: 'Hanna Grey',
    href: 'https://www.hannahgrey.com/',
    src: HannaGrey,
  },
  {
    alt: 'Redbeard Ventures',
    href: 'https://redbeard.ventures/',
    src: RedbeardVentures,
  },
  {
    alt: 'Figment',
    href: 'https://www.figmentcapital.io/',
    src: Figment,
  },
  {
    alt: 'Spartan',
    href: 'https://www.spartangroup.io/',
    src: Spartan,
  },
  {
    alt: '6th Man',
    href: 'https://6thman.ventures/',
    src: SixthMan,
  },
  {
    alt: 'Visary',
    href: 'https://visary.capital/',
    src: Visary,
  },
];

const investorsNames = [
  'Sandeep Nailwal',
  'David Gan',
  'David Sneider and Chris Wiggum',
  'Ryan Selkis',
  'Stepan Simkin',
  'Ryan Li',
];

export default function FooterInvestors() {
  return (
    <Stack
      sx={{
        border: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 1,
      }}
    >
      <Stack
        sx={{
          p: 4,
          pb: 6,
          color: 'white.main',
        }}
      >
        <Typography color="inherit" variant="subtitle1" mb={5}>
          Investors
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            columnGap: 132 / 16,
            rowGap: {
              xs: 1,
              sm: 5,
            },
          }}
        >
          {logos.map((logo) => (
            <Stack
              key={logo.alt}
              component={Link}
              sx={{
                position: 'relative',
                height: 96,
                maxWidth: 220,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              href={logo.href}
            >
              <Image src={logo.src} alt={logo.alt} fill objectFit="contain" />
            </Stack>
          ))}
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 4,
          px: 4,
          py: 6,
          color: 'white.main',
        }}
      >
        {investorsNames.map((name) => (
          <Typography
            key={name}
            color="inherit"
            textAlign="center"
            variant="body2"
          >
            {name}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}
