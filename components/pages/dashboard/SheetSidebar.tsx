'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { Sidebar } from '@/components/pages/dashboard/Sidebar';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type SheetSidebarProps = {
  logout?: ReactNode;
};

export const SheetSidebar = ({ logout }: SheetSidebarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentPathname = useRef<string>();

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
          <Sidebar logout={logout} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
