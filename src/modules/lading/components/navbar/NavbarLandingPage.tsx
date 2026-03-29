'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/common/libs/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/common/libs/ui/sheet';
import AppLogo from '../../AppLogo';
import useAuthStore from '@/modules/auth/hooks/useAuthStore';
import LogoutButton from '@/modules/auth/components/LogoutButton';

const linkNavigation = [
  {
    name: 'Features',
    href: '#features',
  },
  {
    name: 'Use cases',
    href: '#use-cases',
  },
  {
    name: 'How it works',
    href: '#how-it-works',
  },
  {
    name: 'FAQ',
    href: '#faq',
  },
];

const NavbarLandingPage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <AppLogo />

        <nav className="hidden items-center gap-8 md:flex">
          {linkNavigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated ? (
            <Button asChild variant="ghost" className="sm:inline-flex">
              <Link href="/auth/login">Sign in</Link>
            </Button>
          ) : (
            <LogoutButton />
          )}

          <Button className="rounded-xl px-5">Start free</Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                <nav className="flex flex-col gap-4">
                  {linkNavigation.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm font-medium text-foreground transition hover:text-primary"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 border-t pt-4">
                  {!isAuthenticated ? (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/auth/login">Sign in</Link>
                    </Button>
                  ) : (
                    <LogoutButton />
                  )}

                  <Button className="w-full rounded-xl">Start free</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarLandingPage;
