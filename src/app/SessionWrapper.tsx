// src/app/SessionWrapper.tsx
'use client';

// ❌ Supprimé : import { SessionProvider } from "next-auth/react";

export function SessionWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // simple wrapper sans session
}

