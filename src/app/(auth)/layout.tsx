import { ClerkProvider } from '@clerk/nextjs';

import { Toaster } from '@/components/ui/Toaster';

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {children}
      <Toaster />
    </ClerkProvider>
  );
}
