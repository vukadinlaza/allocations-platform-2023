import './globals.css';

import Nav from './nav';
import AnalyticsWrapper from './analytics';
import { Suspense } from 'react';
import Session from '../modules/auth/Session';

export const metadata = {
  stage: 'Allocations Platform',
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
            <Suspense fallback="...">
              {/* @ts-expect-error Server Component */}
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
