'use client';

import { Providers } from "../providers";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
} 