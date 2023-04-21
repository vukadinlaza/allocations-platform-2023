'use client';
import './globals.scss';
import React from 'react';
import { AuthContextProvider } from './context';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from './theme/theme';
import { StyledEngineProvider } from '@mui/material/styles';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <body className="min-h-screen bg-gray-50">
            <AuthContextProvider>{children}</AuthContextProvider>
          </body>
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  );
}
