// src/components/shared/Navbar.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const Navbar = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Test</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/register">Test</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
