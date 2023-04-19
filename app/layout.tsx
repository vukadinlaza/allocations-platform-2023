import './globals.css';

import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense } from 'react';
import Session from '../modules/auth/Session';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allocations Platform',
  description: 'The best Deal Management Platform for Private Investments'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Session>
          <>
            <Suspense>
              <Nav />
            </Suspense>
            {children}
            <AnalyticsWrapper />
          </>
        </Session>
      </body>
    </html>
  );
}
