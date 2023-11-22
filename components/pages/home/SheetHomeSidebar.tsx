import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export const SheetHomeSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentPathname = useRef<string | null>();

  useEffect(() => {
    if (!currentPathname.current) {
      currentPathname.current = pathname;
    } else if (currentPathname.current !== pathname) {
      currentPathname.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  return (
    <div className="block lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <aside className="w-full" aria-label="Sidebar">
            <div className="relative flex min-h-0 flex-1 flex-col bg-white pt-0 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
                <div className="flex-1 space-y-1 divide-y divide-gray-200 bg-white px-3 dark:divide-gray-700 dark:bg-gray-800">
                  <ul className="space-y-2 pb-2 text-center">
                    <li>
                      <Link
                        href="/"
                        className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/tutorial"
                        className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"
                      >
                        [Tutorial]
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </SheetContent>
      </Sheet>
    </div>
  );
};
