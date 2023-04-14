"use client";
import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

const Session: FC<{children: ReactNode}> = ({children})=>{
  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  );
}

export default Session;
