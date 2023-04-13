import './globals.css';

import Nav from './nav';
import AnalyticsWrapper from './analytics';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'Allocations Platform',
  description:
    'The best Deal Management Platform for Private Investments'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <AnalyticsWrapper />
        <Toast />
      </body>
    </html>
  );
}
