'use client';
import Script from 'next/script';
import React from 'react';

export default function RootLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
    <head>
      <title>Allocations - Build SPVs and Funds instantly</title>
      <meta
        name='description'
        content='Scale your fund to $100m+ AUM with Allocation’s next generation AI powered fund administration platform. Designed for speed and efficiency.'
      />
      <meta name='robots' content='noindex' />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />
    </head>
    <body>
    {children}
    </body>
    <Script async src='https://tally.so/widgets/embed.js'></Script>
    </html>
  );
}
