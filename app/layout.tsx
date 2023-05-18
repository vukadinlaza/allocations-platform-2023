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
