'use client';
import Maintenance from '@/components/Maintenance';
import SupabaseProvider from '@/lib/supabase-provider';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { AuthContextProvider } from './context';
import './globals.scss';
import { lightTheme } from './theme/theme';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const maintenance = false;
  const isVerifyRoute = usePathname() === '/verify';

  return (
    <html lang="en">
      <head>
        <title>Allocations - Build SPVs and Funds instantly</title>
        <meta
          name="description"
          content="Scale your fund to $100m+ AUM with Allocation’s next generation AI powered fund administration platform. Designed for speed and efficiency."
        />
        <meta name="robots" content="noindex" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <ThemeProvider theme={lightTheme}>
        <body className="relative min-h-screen bg-gray-50">
          {maintenance && <Maintenance />}
          {!maintenance && (
            <div>
              {!isVerifyRoute && (
                <SupabaseProvider>
                  <AuthContextProvider>{children}</AuthContextProvider>
                </SupabaseProvider>
              )}
              {isVerifyRoute && children}
            </div>
          )}
        </body>
      </ThemeProvider>
      <Script async src="https://tally.so/widgets/embed.js"></Script>
    </html>
  );
}
