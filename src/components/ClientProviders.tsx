'use client';

import { ThemeProvider } from 'next-themes';
import NextToploader from 'nextjs-toploader';
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Only render the ThemeProvider after mounting
  }, []);

  if (!mounted) {
    return <>{children}</>; // Render without theme provider initially (avoids mismatch)
  }
  return (
    <>
      <NextToploader />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      <Toaster />
    </>
  );
}
