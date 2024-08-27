'use client';
import { brandColors } from '@/theme/config/brand';
import {
  getDefaultConfig,
  lightTheme as LightTheme,
  // darkTheme as DarkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

export const config = getDefaultConfig({
  appName: 'Gateway Network',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

const lightTheme = LightTheme({
  overlayBlur: 'small',
  accentColor: brandColors.primary,
});

export const theme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
  },
};