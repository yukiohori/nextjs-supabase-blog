import { UserButton } from '@clerk/nextjs';

import { Header } from '@/components/pages/dashboard/Header';
import { Sidebar } from '@/components/pages/dashboard/Sidebar';
import { SignOutButton } from '@/components/pages/dashboard/SignOutButton';

export async function generateMetadata() {
  return { title: 'DASHBOARD' };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full text-gray-700 antialiased">
      <Header user={<UserButton afterSignOutUrl="/" />} />
      <Sidebar fixed logout={<SignOutButton />} />
      <div className="w-full">
        <main className="flex flex-row">
          <div className="hidden w-64 shrink-0 lg:flex" />
          <div className="w-full px-2 pt-20">{children}</div>
        </main>
      </div>
    </div>
  );
}
