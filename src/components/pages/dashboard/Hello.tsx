'use client';

import { useUser } from '@clerk/nextjs';

import { Alert } from '@/components/ui/Alert';

const Hello = () => {
  const { user } = useUser();

  return <Alert>👋 Hello {user?.primaryEmailAddress?.toString()}</Alert>;
};

export { Hello };
