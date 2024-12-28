import Link from 'next/link';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold inline-block">Tweet Analytics</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Dashboard
            </Link>
            <Link href="/search" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Search
            </Link>
            <Link href="/reports" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Reports
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button variant="ghost" className="h-8 w-8 px-0">
              <span className="sr-only">Toggle user menu</span>
              {/* Add user icon/avatar here */}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}