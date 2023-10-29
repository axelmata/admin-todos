'use client'

import { SessionProvider } from "next-auth/react";


interface Props {
    children: React.ReactNode
}

export const AuthProvider =  ({ children, ...rest }: Props) => {
  return (
    <SessionProvider>
      { children }
    </SessionProvider>
  );
}