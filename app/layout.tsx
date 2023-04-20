import './globals.scss';
import * as React from 'react';
import { AuthContextProvider } from './context';

export const metadata = {
  title: 'Allocations Platform',
  description: 'The best Deal Management Platform for Private Investments'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
