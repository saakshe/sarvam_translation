'use client';

import { Providers } from "../providers";

export function ClientBody({ children }: { children: React.ReactNode }) {
  return (
    <body className="antialiased">
      <Providers>{children}</Providers>
    </body>
  );
} 