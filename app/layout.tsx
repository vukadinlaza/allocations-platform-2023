'use client';
import Maintenance from '@/components/Maintenance';
import SupabaseProvider from '@/lib/supabase-provider';
import Hotjar from '@hotjar/browser';
import { ThemeProvider } from '@mui/material';
import Script from 'next/script';
import React from 'react';
import { AuthContextProvider } from './context';
import './globals.scss';
import { lightTheme } from './theme/theme';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const maintenance = false;
  // const siteId = 3502247;
  // const hotjarVersion = 6;
  // Hotjar.init(siteId, hotjarVersion);
  return (
    <html lang="en">
      <head>
        <title>Allocations - Build SPVs and Funds instantly</title>
        <meta
          name="description"
          content="Scale your fund to $100m+ AUM with Allocation’s next generation AI powered fund administration platform. Designed for speed and efficiency."
        />
        <meta name="robots" content="noindex" />
      </head>
      <ThemeProvider theme={lightTheme}>
        <body className="relative min-h-screen bg-gray-50">
          {maintenance && <Maintenance />}
          {!maintenance && (
            <SupabaseProvider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </SupabaseProvider>
          )}
        </body>
      </ThemeProvider>
      <Script async src="https://tally.so/widgets/embed.js"></Script>
    </html>
  );
}
