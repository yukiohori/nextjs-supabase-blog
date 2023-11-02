'use client';

import { SignOutButton as SignOutButtonClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();
  return (
    <SignOutButtonClerk signOutCallback={() => router.push('/')}>
      <button
        className="border-none text-gray-700 hover:text-gray-900"
        type="button"
      >
        Sign out
      </button>
    </SignOutButtonClerk>
  );
};

export { SignOutButton };
