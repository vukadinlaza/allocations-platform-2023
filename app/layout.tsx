'use client';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import { AuthContextProvider } from './context';
import './globals.scss';
import { lightTheme } from './theme/theme';
import SupabaseProvider from '@/lib/supabase-provider';

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
    </html>
  );
}
