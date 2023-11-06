'use client';

import { UserButton } from '@clerk/nextjs';

import { Header } from '@/components/pages/dashboard/Header';
import { Sidebar } from '@/components/pages/dashboard/Sidebar';
import { SignOutButton } from '@/components/pages/dashboard/SignOutButton';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full text-gray-700 antialiased">
      <Header user={<UserButton afterSignOutUrl="/" />} />
      <Sidebar logout={<SignOutButton />} />
      <div className="w-full">
        <main className="flex flex-row">
          <div className="hidden w-64 shrink-0 lg:flex" />
          <div className="w-full px-2 pt-20">{children}</div>
        </main>
      </div>
    </div>
  );
}
