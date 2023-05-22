'use client';
import SupabaseProvider from '@/lib/supabase-provider';
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
  return (
    <html lang="en">
      <head>
        <title>
          Allocations - The Fastest Growing Private Markets Platform
        </title>
        <meta
          name="description"
          content="Allocations is the fastest growing private markets platform that helps you close more deals. Discover our exclusive solution to optimize your transaction efficiency and maximize your success. Please note that this page is not intended to be indexed by browsers."
        />
        <meta name="robots" content="noindex" />
      </head>
      <ThemeProvider theme={lightTheme}>
        <body className="relative min-h-screen bg-gray-50">
          <SupabaseProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </SupabaseProvider>
        </body>
      </ThemeProvider>
      <Script async src="https://tally.so/widgets/embed.js"></Script>
    </html>
  );
}
